import React, { useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setDimensionAction } from '../../redux/actions/dimensionActions'
import styles from '../../styles/center.module.css'
// const Center = ({ children }) => {
//     const { width, height } = useSelector(state => state.dimensions)
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(setDimensionAction({
//             width: Dimensions.get('window').width,
//             height: Dimensions.get('window').height
//         }))
//     }, [])
//     return (
//         <View style={{
//             width: (width > height) ? width / 1.5 : width,
//             // minWidth: 300,
//             height: '100%',
//             alignSelf: 'center',
//         }}>
//             {children}
//         </View>
//     )
// }

const Center = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Center
