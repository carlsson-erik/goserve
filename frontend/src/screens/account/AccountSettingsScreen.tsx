import React from "react";

const AccountSettingsScreen = () => {
  const name = React.useState("");

  console.log(name);

  return (
    <div>
      <span className="text-2xl">Account settings screen</span>
    </div>
  );
};

export default AccountSettingsScreen;
