import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
scroll:{
  backgroundColor: 'black',
},
  // login
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

  },
  container_B: {

    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    paddingBottom: 60
  },
  titulo: {
    fontSize: 80,
    color: 'white',
    fontWeight: 'bold'

  },
  subtitulo: {
    fontSize: 20,
    color: 'gray',
    paddingBottom: 10


  },
  subtitulov2: {
    marginTop: 80,
    fontSize: 20,
    color: 'gray',
    paddingBottom: 30


  },
  subtitulov3: {
    marginTop: 20,
    fontSize: 20,
    color: 'gray',
    paddingBottom: 5


  },
  textinput: {
    padding: 10,
    paddingStart: 30,
    borderRadius: 30,
    height: 50,
    marginTop: 20,
    width: '90%',
    backgroundColor: '#fff'

  },
   

  button_L: {
    marginTop: 50,
    paddingTop: 15,
    borderRadius: 30,
    height: 50,
    width: '40%',
    backgroundColor: '#00bfff'

  },
  button_L2: {

    paddingTop: 15,
    borderRadius: 30,
    marginBottom: 30,
    height: 50,
    width: '40%',
    backgroundColor: 'red'

  },
  text_bL: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,

  },
  text_L: {
    marginTop: 2,
    paddingTop: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    paddingStart: 180

  },
  text_LB: {
    marginTop: 2,
    paddingTop: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 15,


  },
  image: {
    padding: '10',
    width: '10%',


  },

  // Home
  Home_container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  Home_input_container: {

    backgroundColor: 'black'
  },
  Home_input: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 6,
    fontSize: 16,
    color: 'grey'
  },


  Home_rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: 'lightsteelblue',
    borderBottomWidth: 1,
    borderBottomColor: 'lightsteelblue',
    padding: 5,
    margin: 5,
    borderLeftWidth: 1,
    borderLeftColor: 'lightsteelblue',
    borderRightWidth: 1,
    borderRightColor: 'lightsteelblue',
    borderRadius: 10,
    height: 165,

  },
  Home_columContainer: {
    flex: 5.5,
    flexDirection: 'column',
    padding: 4,
    alignItems: 'center',
    /*
        borderTopWidth: 1,
        borderTopColor: 'lightsteelblue',
        borderBottomWidth: 1,
        borderBottomColor: 'lightsteelblue',
    
        //borderLeftWidth: 5,
        //borderLeftColor: 'green',
        borderRightWidth: 1,
        borderRightColor: 'lightsteelblue',
        borderRadius: 10,*/
    height: 165,

  },


  Home_text_t: {
    flex: 1,
    paddingTop: 4,
    color: 'mintcream',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    //backgroundColor: 'green',

  },
  Home_text_d: {
    flex: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'mintcream',
    // backgroundColor: 'green',


  },
  Home_image: {

    flex: 2.5,
    resizeMode: 'stretch',
    alignItems: 'center',
    backgroundColor: 'yellow',
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    //borderBottomLeftRadius: 10,
    //borderBottomRightRadius: 10,




  },
  Home_imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    // borderTopLeftRadius: 30,
    //borderTopRightRadius: 10,
    //borderBottomLeftRadius: 10,
    //borderBottomRightRadius: 10,

  },

  Home_rowContainer_button_p: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',

    //borderTopLeftRadius: 20,
    borderTopRightRadius: 10,
    //borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,

    height: 165,
  },

  Home_buttonText_p: {
    paddingTop: 10,


    color: 'white',
    transform: [{ rotate: '270deg' }],
  },
  //Seccion video
  video_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',


  },

  video_video_container: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
    backgroundColor: 'black',
    alignSelf: 'center',
    height: '100%',
    width: '100%'

  },
  video_video: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  video_video_container_cuerpo: {
    flex: 2,
    paddingTop: 4,
    alignItems: 'center',
    backgroundColor: 'black',
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  video_list_container_text: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    backgroundColor: 'black',

    width: '100%',
  }
  ,
  video_list_container: {

    flex: 1,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',

    backgroundColor: '#171718',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,


  },

  video_list_item: {
    padding: 10,
    fontSize: 18,
    width: '100%',
    height: 42,
    backgroundColor: '#171718',
    borderBottomColor: 'lightsteelblue',
    borderBottomWidth: 1,
    color: 'white'



  },
  video_list_item_selectedItem: {
    backgroundColor: '#393d42',
    borderRadius: 10



  },
  video_list_item_playing: {
    backgroundColor: 'green', // Por ejemplo, resalta en verde cuando el video está reproduciéndose
  },
  //anuncios
  adContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }



});