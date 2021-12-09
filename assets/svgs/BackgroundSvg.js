import * as React from "react"
import Image from 'next/image'
import { View } from "react-native"
function BackgroundSvg(props) {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // backgroundColor : 'blue',
            zIndex : 5,
            // flexDirection : 'row'
        }}
        >
            <Image
                src={require('../images/background.svg')}
                width={700}
                height={600}
            />
            {/* <Image
                src={require('../images/background.svg')}
                layout='responsive'
            /> */}
        </View>
    )
}

export default BackgroundSvg
