import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            animation: new Animated.Value(0)
        };
    }

    toggleAccordion = () => {
        const { isOpen, animation } = this.state;
        const initialValue = isOpen ? 1 : 0;
        const finalValue = isOpen ? 0 : 1;

        this.setState({ isOpen: !isOpen });

        animation.setValue(initialValue);
        Animated.spring(animation, {
            toValue: finalValue,
            friction: 6,
            useNativeDriver: true
        }).start();
    };

    render() {
        const { title, children } = this.props;
        const { animation } = this.state;

        const rotateAnimation = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });

        const opacityAnimation = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        return (
            <View style={styles.accordionContainer}>
                <TouchableOpacity onPress={this.toggleAccordion}>
                    <View style={styles.tituloContainer}>
                        <Text style={styles.titulo1}>{title}</Text>
                        <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
                            <Text style={styles.titulo2}>▼</Text>
                        </Animated.View>
                    </View>
                </TouchableOpacity>
                <Animated.View style={{
                    opacity: opacityAnimation,
                    overflow: 'hidden',
                    //backgroundColor: 'red',
                    borderBottomEndRadius: 30,
                    borderBottomLeftRadius: 30,
                    alignItems: 'center'
                }}>
                    {this.state.isOpen ? children : null}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    accordionContainer: {
        marginTop: 10,
        // paddingVertical: 15,
        //  paddingHorizontal: 20,
        // borderRadius: 30,
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#E1F5FE'
    },
    tituloContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00bfff',
        
        paddingVertical: 15,
        paddingHorizontal: 82,
        borderRadius: 30,

    },
    titulo1: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
       // backgroundColor: 'yellow'
    },
    titulo2: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
        //backgroundColor: 'green'
    }


});

export default Accordion;
