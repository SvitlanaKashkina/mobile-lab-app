import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive width & height helpers
export const wp = (percentage) => (width * parseFloat(percentage)) / 100;
export const hp = (percentage) => (height * parseFloat(percentage)) / 100;

const isTablet = width >= 768;

export const styles = StyleSheet.create({
  menuContainer: {
    marginLeft: 2, 
    position: 'absolute',
    top: wp('10%'),
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    borderColor: '#666565',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    zIndex: 999,
    minWidth: wp('55%'),
  },
  menuItem: {
    fontSize: wp(isTablet ? '3.8%' : '4.5%'),
    color: 'darkblue',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
