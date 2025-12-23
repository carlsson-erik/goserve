package auth

import "testing"

func TestHashPasswordForStorage_Empty(t *testing.T) {
	_, err := HashPasswordForStorage("")
	if err == nil {
		t.Fatalf("expected error")
	}
}

func TestHashPasswordForStorage_HashesPlaintext(t *testing.T) {
	plain := "s3cret-password"

	hashed, err := HashPasswordForStorage(plain)
	if err != nil {
		t.Fatalf("HashPasswordForStorage error: %v", err)
	}
	if hashed == plain {
		t.Fatalf("expected hashed password to differ from plaintext")
	}
	if !IsBCryptHash(hashed) {
		t.Fatalf("expected bcrypt hash, got %q", hashed)
	}
	if !CompareHashAndPassword(hashed, plain) {
		t.Fatalf("expected hash to validate against plaintext")
	}
}

func TestHashPasswordForStorage_DoesNotDoubleHash(t *testing.T) {
	plain := "another-password"

	first, err := HashPasswordForStorage(plain)
	if err != nil {
		t.Fatalf("HashPasswordForStorage error: %v", err)
	}

	second, err := HashPasswordForStorage(first)
	if err != nil {
		t.Fatalf("HashPasswordForStorage error: %v", err)
	}

	if second != first {
		t.Fatalf("expected bcrypt hash to pass through unchanged")
	}
	if !CompareHashAndPassword(second, plain) {
		t.Fatalf("expected stored hash to validate against plaintext")
	}
}

func TestCompareHashAndPassword_CorrectPassword(t *testing.T) {
	plain := "user-input-password"

	hashed, err := HashPasswordForStorage(plain)
	if err != nil {
		t.Fatalf("HashPasswordForStorage error: %v", err)
	}

	if !CompareHashAndPassword(hashed, plain) {
		t.Fatalf("expected correct password to match")
	}
}

func TestCompareHashAndPassword_WrongPassword(t *testing.T) {
	plain := "correct-password"
	wrong := "wrong-password"

	hashed, err := HashPasswordForStorage(plain)
	if err != nil {
		t.Fatalf("HashPasswordForStorage error: %v", err)
	}

	if CompareHashAndPassword(hashed, wrong) {
		t.Fatalf("expected wrong password to NOT match")
	}
}

func TestCompareHashAndPassword_EmptyPassword(t *testing.T) {
	plain := "some-password"

	hashed, err := HashPasswordForStorage(plain)
	if err != nil {
		t.Fatalf("HashPasswordForStorage error: %v", err)
	}

	if CompareHashAndPassword(hashed, "") {
		t.Fatalf("expected empty password to NOT match")
	}
}
