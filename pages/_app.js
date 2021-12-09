import * as React from 'react'
import Head from 'next/head'
import Router from 'next/router';
import nProgress from 'nprogress';
import Header from '../components/Header';
import { Dimensions, ScrollView, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../redux/reducers';
import { setDimensionAction } from '../redux/actions/dimensionActions';
import '../styles/global.css'
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Backdrop, CircularProgress, Slide, Snackbar } from '@mui/material';
import { closeSnackBarAction } from '../redux/actions/snackBarActions';


function MyApp({ Component, pageProps }) {


  const dispatch = useDispatch()

  const loading = useSelector(state => state.loading)
  const snackBar = useSelector(state => state.snackBar)

  const scrollView = React.useRef(null)



  React.useEffect(() => {
    console.log('Screen>>>', Dimensions.get('window').width > Dimensions.get('window').height)
    dispatch(setDimensionAction({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }))
    const subsciption = Dimensions.addEventListener('change', data => {
      console.log('CHANGE >>>', data.window.width)
      dispatch(setDimensionAction({
        width: data.window.width,
        height: data.window.height
      }))
    })


    Router.events.on('routeChangeStart', url => {
      console.log('routeChangeStart >>>', url)
      nProgress.start()
    })
    Router.events.on('routeChangeComplete', url => {
      console.log('routeChangeComplete >>>', url)
      scrollView?.current?.scrollTo({ x: 0, y: 0, animated: true })
      nProgress.done()
    })
    Router.events.on('routeChangeError', url => {
      console.log('routeChangeError >>>', url)
      nProgress.done()
    })

    return () => {
      subsciption?.remove()
    }
  }, [])
  // React.useEffect(() => {
  //   const handleStart = (url) => setLoading(true);
  //   const handleComplete = (url) => setLoading(false);
  //   console.log('USE EFFECT CALLEDs')


  //   return () => {
  //     Router.events.off('routeChangeStart', handleStart)
  //     Router.events.off('routeChangeComplete', handleComplete)
  //     Router.events.off('routeChangeError', handleComplete)
  //   }
  // }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no,user-scalable=0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <View style={{
        flex: 1,
        backgroundColor: '#f7f7f7',
      }}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        // onClick={() => setLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={snackBar.show}
          autoHideDuration={3000}
          onClose={() => dispatch(closeSnackBarAction())}
          TransitionComponent={props => <Slide {...props} style={{
            backgroundColor: 'green'
          }} direction="right" />}
          message={snackBar.message || "Ticket created successfully. We'll get in touch with you shortly."}
          key={'test key'}
        />
        <Header />
        <ScrollView
          ref={scrollView}
          contentContainerStyle={{
            // height: '100%'
          }}>
          <Component {...pageProps} />
        </ScrollView>
        <ToastContainer />
      </View>
    </>
  )
}

const ReduxApp = (props) => {
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['loading', 'snackBar']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyApp {...props} />
      </PersistGate>
    </Provider>
  )
}



export default ReduxApp
