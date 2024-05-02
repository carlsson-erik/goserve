import { useState } from "react";

const TileGrid = () => {
    const [hight, setHight] = useState(1)
    const [width, setWidth] = useState(1)

    return (
        <div tw="">
            This is a Test Grid
        </div>
    );
};

export default TileGrid
