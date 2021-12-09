import router, { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import Center from '../components/layouts/Center'
import CONSTANTS, { fonts } from '../CONSTANTS'
import goTo from '../utils/router'
import { isMobile } from 'react-device-detect';
import Image from 'next/image'
import BackgroundSvg from '../assets/svgs/backgroundsvg'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getCatsAndSubs } from '../services/requests'
import { getMiddlewareRegex } from 'next/dist/shared/lib/router/utils'
import { initFaqsAction } from '../redux/actions/faqActions'
import { Autocomplete, Backdrop, Card, CircularProgress, TextField } from '@mui/material'
import { styled } from '@material-ui/core/styles';
import styles from '../styles/home.module.css'
import CloseIcon from '@mui/icons-material/Close';

const SearchBox = styled(TextField)(() => ({
    '& fieldset': {
        borderRadius: '25px',
        paddingLeft: '10px'
    },
}));
const Home = (props) => {
    const { width, height } = useSelector(state => state.dimensions)

    const inputRef = useRef()
    const [layoutWidth, setLayoutWidth] = useState(300)
    const [currentSubCat, setCurrentSubCat] = useState(null)
    const [subCats, setSubCats] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('PROPS >>>>', props)
        setSubCats(props.subCats)
        dispatch(initFaqsAction({
            catSection: props.items,
            subCats: props.subCats
        }))
    }, [])
    return (
        <Center>
            <View style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#fff',
                marginTop: 5
            }}>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={currentSubCat ? true : false}
                    onClick={() => setCurrentSubCat(null)}
                >
                    <Card className={styles.card}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <CloseIcon />
                        </div>
                        <div
                            // className={styles.subCatText}
                            style={{
                                fontWeight: '500',
                                fontSize: '1.5rem',
                                color: 'black',
                                marginBottom: '10px'
                            }}
                            role='link'
                            aria-pressed="false"
                        >{currentSubCat?.name}</div>
                        <div style={{ fontWeight: '300' }}>{currentSubCat?.content}</div>
                        <div style={{
                            marginTop: '10px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            borderTop: '1px solid #eee',
                            borderBottom: '1px solid #eee',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',

                        }}>
                            <div style={{
                                fontWeight: '300',
                                color: 'grey',
                                display: 'flex',
                                fontSize: '0.9rem',
                            }}>Have more questions?
                                <div
                                    onClick={() => {
                                        goTo('tickets/createTicket', {
                                            category: currentSubCat?.parent
                                        })
                                        setCurrentSubCat(null)
                                    }}
                                    style={{
                                        color: 'red',
                                        marginLeft: '5px',
                                        textDecorationLine: 'underline'
                                    }}>Submit a request</div>
                            </div>
                        </div>
                    </Card>
                </Backdrop>

                <View style={{
                    height: '32vh',
                    backgroundColor: '#fff',
                    zIndex: 100
                    // justifyContent: 'center',
                    // alignItems: 'center'
                }}>
                    <BackgroundSvg />
                    <View style={{
                        zIndex: 10,
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: '2rem',
                            fontFamily: fonts.name,
                            fontWeight: fonts.medium,
                        }}>How can we help you?</Text>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={subCats}
                            sx={{ width: '80%' }}
                            onChange={(e, value) => {
                                inputRef.current.blur()
                                setCurrentSubCat(value)
                            }}
                            getOptionLabel={option => option.name}
                            freeSolo
                            renderInput={(params) => (
                                <div style={{
                                    borderRadius: 100,
                                    border: '0px solid red'
                                }}>
                                    <SearchBox
                                        inputRef={inputRef}
                                        variant='outlined'
                                        style={{
                                            borderRadius: 10,
                                            backgroundColor: '#fff',
                                            marginTop: 10,
                                            shadowColor: '#999',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }} {...params} label="Search" />
                                </div>
                            )
                            }
                        />
                        {/* <View style={{
              flexDirection: 'row',
              width: '80%',
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 50,
              marginTop: 10,
              shadowColor: '#999',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center'
                  // backgroundColor: 'red'
                }}>
                <Image
                  src={require('../assets/images/search.png')}
                  width={25}
                  height={25}
                />
              </View>

              <TextInput
                placeholder='Search'
                style={{
                  height: '100%',
                  width: '100%',
                  marginLeft: 10,
                  borderWidth: 0,
                  fontFamily: fonts.name,
                  fontWeight: fonts.regular,
                  fontSize: 16
                }}
              />
            </View> */}

                    </View>
                </View>
                {/* <div style={{
          width: '80%',
          display: 'flex',
          alignSelf: 'center',
          height: 300,
          backgroundColor: 'red',
          position: 'absolute',
          top: '24vh',
          zIndex: 100
        }}></div> */}
                <View
                    onLayout={event => {
                        setLayoutWidth(event.nativeEvent.layout.width)
                    }}
                    style={[{
                        width: '100%',
                        // backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    (width > height) && {
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }
                    ]}>
                    {
                        props.items ?
                            props.items.map(itm => (
                                <DashboardButton icon={getImage(itm.name)} key={itm._id} layoutWidth={layoutWidth} onPress={() => {
                                    goTo('/cats', {
                                        category: itm._id
                                    })
                                    // goTo("/", {
                                    //     name: 'test',
                                    //     phone: '85559670217',
                                    //     store: 'Test Restaurant'
                                    // })
                                }} title={itm.name} />
                            ))
                            :
                            null

                    }
                </View>
            </View>
        </Center >
    )
}

const getImage = name => (SUPPORT_SUBJECTS.find(itm => itm.title == name)?.icon || SUPPORT_SUBJECTS[SUPPORT_SUBJECTS.length - 1].icon)



const DashboardButton = ({
    onPress = () => { },
    title = '',
    layoutWidth = 1,
    icon = null
}) => {
    const { width, height } = useSelector(state => state.dimensions)
    return (
        <Button
            initialColor='#fff'
            hoverColor='#f7f7f7'
            buttonProps={{
                onPress: onPress,
                style: {
                    width: (width < height) ? width - 30 : layoutWidth / 3,
                    padding: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#eee',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                    alignSelf: 'center',
                    // backgroundColor: 'red'
                }
            }}
        >
            <Image
                src={icon}
                width={40}
                height={40}
            />
            <Text style={{
                fontFamily: fonts.name,
                fontWeight: fonts.regular,
                fontSize: 18
            }}>{title}</Text>
        </Button>
    )
}

export async function getServerSideProps() {
    let finalProps = {}
    try {
        const response = await getCatsAndSubs()
        finalProps = {
            items: response.items,
            subCats: response.subCats
        }
    } catch (error) {
        finalProps = {
            err: error
        }
    }

    return {
        props: { ...finalProps }
    }


}

export default Home

export const SUPPORT_SUBJECTS = [
    {
        title: 'Billing POS',
        icon: require('../assets/images/pos.png'),
        route: 'billingPos'
    },
    {
        title: 'Printer',
        icon: require('../assets/images/printer.png'),
        route: 'printer'
    },
    {
        title: 'Menu Management',
        icon: require('../assets/images/menu.png'),
        route: 'menu'
    },
    {
        title: 'Inventory',
        icon: require('../assets/images/inventory.png'),
        route: 'inventory'
    },
    {
        title: 'Report',
        icon: require('../assets/images/report.png'),
        route: 'report'
    },
    {
        title: 'Other',
        icon: require('../assets/images/other.png'),
        route: 'other'
    },
]