import React from "react";
import { AddPropButton } from "../../flowslib";
import { Node, NodeParams } from '../../flowslib';
import { Box, Text, HStack, Icon, Button } from 'native-base'
import { Handle, Position, useEdges } from "reactflow";
import { PORT_TYPES } from "../../flowslib";
import { useAppStore } from "../../../../../context/appStore";
import { useDeviceStore } from "../../../store/DeviceStore";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const isHandleConnected = (edges, handleId) => edges.find(e => (e.targetHandle == handleId || e.sourceHandle == handleId))

const Device = (node: any = {}, nodeData: any = {}, topics: any = {}) => {
    const { publish, data } = topics;
    const { id, type } = node
    const currentDevice = useDeviceStore(state => state.electronicDevice);
    const offsetY = 622.593 //This value is for setting the initial point where the available pins start to draw
    const spacing = 27.7965
    const edges = useEdges();

    const changeDeviceName = () => {
        const isValidDevice = () => !(!(nodeData['element-0'] == '') || nodeData['element-0'].includes(' ') || nodeData['element-0'].includes('.'))
        if (isValidDevice()) {
            if (nodeData['element-0'] == currentDevice) return
            publish('device/changedDeviceName', { deviceName: nodeData['element-0'], oldDeviceName: currentDevice, ts: Date.now() })
        }
    }

    const params = [
        // { label: 'Name', onBlur:()=>changeDeviceName(), field: 'element-0', type: 'input', static: true, pre: (str) => str.replace(/['"]+/g, ''), post: (str) => '"' + str.toLowerCase() + '"'},
        { label: 'Name', isDisabled: true, field: 'element-0', type: 'input', static: true, pre: (str) => str.replace(/['"]+/g, ''), post: (str) => '"' + str.toLowerCase() + '"' },
        { label: 'WiFi SSID', field: 'element-2', type: 'input', static: true, pre: (str) => str.replace(/['"]+/g, ''), post: (str) => '"' + str + '"' },
        { label: 'WiFi Password', field: 'element-3', type: 'input', static: true, pre: (str) => str.replace(/['"]+/g, ''), post: (str) => '"' + str + '"' },
        {
            label: 'WiFi Power mode', field: 'element-4', type: 'select', static: true,
            data: ['"none"', '"light"', '"high"'],
        },
        { label: 'MQTT Address', field: 'element-5', type: 'input', static: true, pre: (str) => str.replace(/['"]+/g, ''), post: (str) => '"' + str + '"' }
    ]
    const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME
    const mqttTopic = `${projectName}/${currentDevice}/status`
    const addChannel = useAppStore(state => state.addChannel)
    const lastMessage = useAppStore(state => state.lastMessageByTopic[mqttTopic]) ?? []
    addChannel(mqttTopic);
    const [connected, setConnected] = React.useState("offline");

    const onCompile = () => {
        publish('device/play', { ts: Date.now() })
    }
    React.useEffect(() => {
        if (lastMessage.message == 'online') {
            setConnected("online");
        } else {
            setConnected("offline")
        }
    }, [lastMessage])
    return (
        <Node output={false} skipCustom={true} node={node} color='#8FCAF9' isPreview={!id} title='ESP32' id={id}  >
            <Button onPress={onCompile} w="40%" alignSelf={'center'} endIcon={<Icon as={MaterialCommunityIcons} name={'upload'} />} m="14px">Upload</Button>
            <HStack alignItems={'center'} justifyContent={'flex-end'} px="14px" pt="10px">
                <Text color={connected == 'online' ? 'warmGray.300' : 'warmGray.300'} mr='5px'>{connected}</Text>
                <Icon as={MaterialCommunityIcons} color={connected == 'online' ? 'green.500' : 'error.600'} name={'circle'} />
            </HStack>
            {<NodeParams id={id} params={params} />}
            <Box marginY={'20px'}>
                <img src={require('../../../assets/deviceassets/esp32c4.png')} />
            </Box>
            {Array(34).fill(1).map((x, i) => i != 9 && i != 14 && i != 13 && i != 15 && i != 21 && i != 33 && i != 28 ? <Handle
                key={i}
                isConnectable={!isHandleConnected(edges, `${id}${PORT_TYPES.data}element-${i + 6}`)}
                isValidConnection={(c) => {
                    const sourceConnected = isHandleConnected(edges, c.sourceHandle)
                    return !sourceConnected
                }}
                type={"target"}
                style={{
                    position: 'absolute',
                    top: i > 14 ? (spacing * (i - 15)) + (offsetY - (spacing * 4)) + 'px' : (spacing * i) + offsetY + 'px',
                    width: "15px",
                    height: "15px",
                    backgroundColor: isHandleConnected(edges, `${id}${PORT_TYPES.data}element-${i + 6}`) ? "#BA68C8" : "white",
                    marginLeft: i > 14 ? '0px' : '10px',
                    marginRight: i > 14 ? '11px' : '0px',
                    border: isHandleConnected(edges, `${id}${PORT_TYPES.data}element-${i + 6}`) ? "2px solid #BA68C8" : "2px solid white"
                }}
                position={i > 14 ? Position.Right : Position.Left}
                id={`${id}${PORT_TYPES.data}element-${i + 6}`}
            /> : <></>)}
            <AddPropButton id={id} nodeData={nodeData} type={"Component"} style={{ marginBottom: '20px' }} />
        </Node>
    );
}

export default Device
