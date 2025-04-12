// StylesIntro.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    marginTop:250,
    width: 350,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  image2: {
    marginTop:120,
     
    resizeMode: 'contain',
    
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 40,
    textAlign: 'left',
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    textAlign: 'justify',
    color: '#555',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00804a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#fff',
  },
});

export default styles;