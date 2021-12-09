import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Center from '../components/layouts/Center'
import { fonts } from '../CONSTANTS'
import styles from '../styles/cats.module.css'
import Image from 'next/image'
import { Motion, spring } from 'react-motion';
import goTo from '../utils/router'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Cats = (props) => {
    const { query } = useRouter()
    const [currentSection, setCurrentSection] = useState(null)

    const faqs = useSelector(state => state.faqs)

    useEffect(() => {
        console.log('QERY >>', query)
        console.log('QERY >>', faqs.catSection.find(itm => itm._id == query?.category))
        const cSection = faqs.catSection.find(itm => itm._id == query?.category) || {}
        setCurrentSection({
            ...cSection,
            items: [...(cSection.items || [])].map(itm => ({ ...itm, isActive: false }))
        })
    }, [faqs])

    const handleTicketClick = () => {
        goTo("tickets/createTicket", {
            category: currentSection._id
        })
    }

    const handleClick = index => {
        setCurrentSection({
            ...currentSection,
            items: currentSection.items.map((itm, idx) => ({
                ...itm,
                isActive: index == idx ? !itm.isActive : itm.isActive
            }))
        })
    }
    return (
        <Center>
            <View style={{
                padding: 20,
                borderBottomColor: '#f7f7f7',
                borderBottomWidth: '0.2rem',
                marginBottom: '1rem'
            }}>
                <Text style={{
                    fontFamily: fonts.name,
                    fontWeight: fonts.regular,
                    fontSize: '1.5rem',
                }}>{currentSection?.name || ''}</Text>
            </View>
            <View style={{
                paddingHorizontal: '2rem'
            }}>
                {
                    currentSection?.items?.map((itm, index) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div
                                    className={styles.subCatText}
                                    role='link'
                                    aria-pressed="false"
                                >{itm.name}</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.moreRegionBox} style={{
                                    flexDirection: 'column',
                                }}>
                                    <div style={{ fontWeight: '300' }}>{itm.content}</div>
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
                                                onClick={handleTicketClick}
                                                style={{
                                                    color: 'red',
                                                    marginLeft: '5px',
                                                    textDecorationLine: 'underline'
                                                }}>Submit a request</div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        // <div
                        //     className={styles.subCatBox}
                        //     style={{
                        //         border: itm.isActive ? '1px solid black' : '0 solid black'
                        //     }}
                        // >
                        //     <div
                        //         className={styles.innerSubCatRow}
                        //         onClick={() => handleClick(index)}

                        //     >
                        //         <div style={{
                        //             justifyContent: 'center',
                        //             alignItems: 'center',
                        //             display: 'flex',
                        //             marginRight: '10px',
                        //             transform: itm.isActive ? 'rotate(120deg)' : 'rotate(30deg)',
                        //             transition: "all 0.2s ease-in-out"
                        //         }}>
                        //             <Image
                        //                 src={require('../assets/images/downArrow.png')}
                        //                 width={15}
                        //                 height={15}
                        //             />
                        //         </div>
                        //         <div
                        //             className={styles.subCatText}
                        //             role='link'
                        //             aria-pressed="false"
                        //         >{itm.name}</div>
                        //     </div>

                        //     <Motion style={{
                        //         currentOpacity: spring(itm.isActive ? 1 : 0, { stiffness: 140, damping: 20 }),
                        //     }}>
                        //         {({ currentOpacity }) => (
                        //             <div className={styles.moreRegionBox} style={{
                        //                 opacity: currentOpacity,
                        //                 display: itm.isActive ? 'flex' : 'none',
                        //                 flexDirection: 'column'
                        //             }}>
                        //                 <div style={{ fontWeight: '300' }}>{itm.content}</div>
                        //                 <div style={{
                        //                     marginTop: '10px',
                        //                     paddingTop: '10px',
                        //                     paddingBottom: '10px',
                        //                     borderTop: '1px solid #eee',
                        //                     borderBottom: '1px solid #eee',
                        //                     justifyContent: 'center',
                        //                     alignItems: 'center',
                        //                     display: 'flex',

                        //                 }}>
                        //                     <div style={{
                        //                         fontWeight: '300',
                        //                         color: 'grey',
                        //                         display: 'flex',
                        //                         fontSize: '0.9rem',
                        //                     }}>Have more questions?
                        //                         <div
                        //                             onClick={handleTicketClick}
                        //                             style={{
                        //                                 color: 'red',
                        //                                 marginLeft: '5px',
                        //                                 textDecorationLine: 'underline'
                        //                             }}>Submit a request</div>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         )}
                        //     </Motion>
                        // </div>
                    ))
                }
            </View >
        </Center >
    )
}


// export async function getServerSideProps() {
//     // await new Promise(resolve => setTimeout(resolve, 3000))
//     console.log('PROPS >>>', props)
//     return {
//         props: {
//             example: 452,
//             ...props
//         }
//     }
// }

export default Cats

const subCatsDemo = [
    "How to add a Menu item",
    "How to add New modifier",
    "How to add tax to the Menu item",
    "How to set Packing Charges on item level",
    "How to set different price for Aggregator",
    "How sync new menu to Aggregator",
    "How to add Description & Upload the item image",
    "How to To do bulk upload for menu change",
    "How to add new category"
]
