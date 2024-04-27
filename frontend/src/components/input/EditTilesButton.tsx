import { IconEditOff, IconEyeEdit } from '@tabler/icons-react'
import { useState } from 'react'

const EditTilesButton = ({ onEditModeChange }: { onEditModeChange: (editMode: boolean) => void }) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const toggleEditMode = () => 
    {
        setEditMode(!editMode)
        onEditModeChange(!editMode)
    }

    return (
    <button onClick={toggleEditMode} tw="text-white hover:bg-gray-600 p-2">
        {editMode ? <IconEyeEdit /> : <IconEditOff />}
    </button>
    )
}


export default EditTilesButton
