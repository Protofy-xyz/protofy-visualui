import { Node, Field, FlowPort, NodeParams } from '../../flowslib';
import { FallbackPort } from '../../flowslib';
import { Box, Button } from 'native-base';
import { MdOutlineSettings } from "react-icons/md";

const ApiMask = (node: any = {}, nodeData = {}) => {
    const nodeParams: Field[] = [{ label: 'Type', field: 'to', type: 'select', data: ['app.get', 'app.post'], static: true }]

    return (
      <Node icon={MdOutlineSettings} node={node} isPreview={!node?.id} title='Cloud Api' id={node.id} color="#A5D6A7" skipCustom={true}>
        <NodeParams id={node.id} params={nodeParams} />
        <NodeParams id={node.id} params={[{ label: 'Path', field: 'param1', type: 'input', pre: (str) => str.replace(/['"]+/g, ''), post: (str) => '"' + str + '"' }]} />
        <Box mb={'50px'}></Box>
        <FlowPort id={node.id} type='input' label='On Request (req, res)' style={{ top: '170px' }} handleId={'request'} />
        <FallbackPort node={node} port={'param2'} type={"target"} fallbackPort={'request'} portType={"_"} preText="(req, res) => " postText="" />
        {nodeData.to == 'app.get'
          ? <Button variant="ghost" colorScheme="blue" w="80%" alignSelf="center" mb="10px" onPress={() => fetch(nodeData['param1'].replace(/['"]+/g, ''))}>Send</Button>
          : null
        }
      </Node>
    )
  }

  export default ApiMask