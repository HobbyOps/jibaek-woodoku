import RenderBlocks from "./RenderBlocks";


function TrayBlock({blockCode, codeDeliver, indexDeliver, trayIndex}) {
    const setBlockInfo = () => {
        codeDeliver(blockCode)
        indexDeliver(trayIndex)
    }

  return (
    <div 
        className="tray-block-area"
        onClick={setBlockInfo}
    >
        <RenderBlocks blockCode={blockCode}></RenderBlocks>
    </div>
  );
}
  
export default TrayBlock;
  