import React from 'react'
import { View, Text } from 'react-native'
import Image from 'next/image'
import logo from '../assets/images/logo.png'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter()
    return (
        <View style={{
            width: '100%',
            backgroundColor: '#fff',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#999',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            marginBottom: 10

        }}>
            <div onClick={() => router.replace('/')}>
                <Image
                    src={logo}
                    alt="Picture of the author"
                    width={100}
                    height={40}

                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
                />
            </div>
            {
                (!router.asPath.includes('tickets/createTicket') && !router.asPath.includes('feedback') && router.asPath != '/')
                &&
                <Button
                    onClick={() => router.push('/tickets/createTicket')}
                    variant="contained"
                    // color={'#000'}
                    // component="label"
                    style={{
                        // marginTop: '20px',
                        backgroundColor: '#3043F7',
                        fontWeight: '400'
                    }}
                >
                    CREATE TICKET
                </Button>
            }
        </View>
    )
}
export default Header
