import renderBlocks from "./RenderBlocks"

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
        <renderBlocks blockCode={blockCode}></renderBlocks>
    </div>
  );
}
  
export default TrayBlock;
  