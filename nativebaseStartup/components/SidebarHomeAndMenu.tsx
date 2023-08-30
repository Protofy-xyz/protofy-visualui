import React from 'react';
import {
  Box,
  VStack,
  ScrollView,
  HStack,
  Icon,
  Text,
  Divider,
  Button,
  Image,
  IconButton,
  useColorModeValue,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
type Icon = {
  iconName: string;
  iconText: string;
};
const list: Icon[] = [
  { iconName: 'home', iconText: 'Home' },
  { iconName: 'menu-book', iconText: 'Syllabus' },
  { iconName: 'speed', iconText: 'Test' },
  { iconName: 'subscriptions', iconText: 'Subscribe' },
];
export default function Sidebar() {
  return (
    <Box
      w="80"
      borderRightWidth="1"
      display="flex"
      _light={{ bg: 'white', borderRightColor: 'coolGray.200' }}
      _dark={{ bg: 'coolGray.900', borderRightColor: 'coolGray.800' }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <VStack
          pb="4"
          mt="10"
          alignItems="center"
          borderBottomWidth="1"
          _light={{
            borderBottomColor: 'coolGray.200',
          }}
          _dark={{
            borderBottomColor: 'coolGray.800',
          }}
        >
          <Image
            width={{ base: 20, md: 140 }}
            height={{ base: 20, md: 140 }}
            source={require('../assets/pannel.png')}
            alt="Alternate Text"
            size="xs"
          />
          <HStack alignItems="center" justifyContent="center" space="2" pt={3}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              _light={{ color: 'coolGray.800' }}
            >
              Jane Doe
            </Text>
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name="mode-edit"
                  size={4}
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'white' }}
                />
              }
            />
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
            pt={1}
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}
          >
            janedoe2@mydomain.com
          </Text>
        </VStack>
        <VStack px="4" py="4">
          {list.map((item, idx) => {
            return (
              <Button
                key={idx}
                variant="ghost"
                justifyContent="flex-start"
                py="3"
                px="5"
                _light={{
                  _text: { color: 'coolGray.800' },
                  _icon: { color: 'coolGray.800' },
                }}
                _dark={{
                  _text: { color: 'coolGray.50' },
                  _icon: { color: 'coolGray.50' },
                }}
                _text={{
                  fontSize: 'md',
                  fontWeight: 'medium',
                }}
                _hover={{
                  _text: {
                    _light: {
                      color: 'primary.900',
                    },
                    _dark: {
                      color: 'primary.500',
                    },
                  },

                  _icon: {
                    _light: {
                      color: 'primary.900',
                    },
                    _dark: {
                      color: 'primary.500',
                    },
                  },
                  _light: {
                    bg: 'primary.100',
                  },
                  _dark: {
                    bg: 'coolGray.800',
                  },
                }}
                leftIcon={
                  <Icon
                    size="5"
                    mr="2"
                    as={MaterialIcons}
                    name={item.iconName}
                  />
                }
              >
                {item.iconText}
              </Button>
            );
          })}
        </VStack>
      </ScrollView>
      <Divider _dark={{ bgColor: 'coolGray.800' }} />
      <Box mx={4}>
        <Button
          variant="ghost"
          justifyContent="flex-start"
          py="3"
          px="5"
          _light={{
            _text: { color: 'coolGray.800' },
            _icon: { color: 'coolGray.800' },
          }}
          _dark={{
            _text: { color: 'coolGray.50' },
            _icon: { color: 'coolGray.50' },
          }}
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
          }}
          _hover={{
            _text: {
              _light: {
                color: 'primary.900',
              },
              _dark: {
                color: 'primary.500',
              },
            },

            _icon: {
              _light: {
                color: 'primary.900',
              },
              _dark: {
                color: 'primary.500',
              },
            },
            _light: {
              bg: 'primary.100',
            },
            _dark: {
              bg: 'coolGray.800',
            },
          }}
          leftIcon={
            <Icon size="5" mr="2" as={MaterialIcons} name="exit-to-app" />
          }
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
