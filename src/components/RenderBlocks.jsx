import RenderBlockRow from "./RenderBlockRow";

function RenderBlocks({blockCode}) {

    const defBlocks = {
        0: {

        },
        1: {
            1: [1, 1, 1, 1, 1]
        },
        2: {
            1: [1, 1, 1]
        },
        3: {
            1: [1],
            2: [1],
            3: [1],
            4: [1],
            5: [1]
        },
        4: {
            1: [1],
            2: [1],
            3: [1]
        },
        5: {
            1: [1, 1],
            2: [1, 1],
        }
    }
    
    const blockRowMap = Object.values(defBlocks[blockCode]).map((row, index) => (<RenderBlockRow value={row} key={index}></RenderBlockRow>))
    
    return (
        <div className="block-wrap">
            {blockRowMap}
        </div>
    );
}

export default RenderBlocks;