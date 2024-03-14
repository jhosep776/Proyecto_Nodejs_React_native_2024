import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleAccordion = () => {
        const initialValue = isOpen ? 1 : 0;
        const finalValue = isOpen ? 0 : 1;

        setIsOpen(!isOpen);

        animation.setValue(initialValue);
        Animated.spring(animation, {
            toValue: finalValue,
            friction: 6,
            useNativeDriver: true
        }).start();
    };

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
            <TouchableOpacity onPress={toggleAccordion}>
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
                borderBottomEndRadius: 30,
                borderBottomLeftRadius: 30,
                alignItems: 'center'
            }}>
                {isOpen ? children : null}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    accordionContainer: {
        marginTop: 10,
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
        borderRadius: 10,
    },
    titulo1: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
    },
    titulo2: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
    }
});

export default Accordion;
