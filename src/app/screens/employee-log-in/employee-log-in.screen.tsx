import React from 'react';
import {View, SafeAreaView, Image, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appStyles} from '../../app.style-impl';
import {style} from './employee-log-in.style-impl';
import {EmployeeLoginScreenState} from './employee-log-in.screen.state';
import {AppNavigationProps} from '../../app-navigation-props';
import {ComponentViewState} from '../../component.state';
import {StringInput, PasswordInput, Button} from '../../components';

export class EmployeeLoginScreen extends React.Component<AppNavigationProps, EmployeeLoginScreenState> {
    constructor(props: AppNavigationProps) {
        super(props);

        this.state = {
            empNumber: {
                value: '',
                valid: false,
            },
            pin: {
                value: '',
                valid: false,
            },
            storeIdentifier: {
                value: '',
                valid: false,
            },
            componentState: ComponentViewState.DEFAULT,
            onceSubmitted: false,
        };
        this.onEmpNumberChanged = this.onEmpNumberChanged.bind(this);
        this.onPinChanged = this.onPinChanged.bind(this);
        this.onStoreIdentifierChanged = this.onStoreIdentifierChanged.bind(this);
        this.login = this.login.bind(this);
    }

    translate(key: string, options?: any) {
        return this.props.screenProps.translate(key, options);
    }

    onPinChanged(pin: string, isValid: boolean) {
        this.setState({
            pin: {
                value: pin,
                valid: isValid,
            },
        });
    }

    onEmpNumberChanged(empNumber: string, isValid: boolean) {
        this.setState({
            empNumber: {
                value: empNumber,
                valid: isValid,
            },
        });
    }

    onStoreIdentifierChanged(storeIdentifier: string, isValid: boolean) {
        this.setState({
            storeIdentifier: {
                value: storeIdentifier,
                valid: isValid,
            },
        });
    }

    getAuthService() {
        return this.props.screenProps.authService;
    }

    async login() {
        this.setState({
            onceSubmitted: true,
        });
        if (this.state.empNumber.valid && this.state.pin.valid && this.state.storeIdentifier.valid) {
            const authService = this.getAuthService();
            this.setState({
                componentState: ComponentViewState.LOADING,
            });
            const response = await
            authService.employeeLogin(this.state.empNumber.value, this.state.storeIdentifier.value, this.state.pin.value);
            if (response.hasData()) {
                this.setState({
                    componentState: ComponentViewState.LOADED,
                });
                this.props.navigation.navigate('AuthLoading');
            } else {
                const msg = response.error || this.translate('no_internet');
                Alert.alert(msg);
                this.setState({
                    componentState: ComponentViewState.ERROR,
                });
            }
        }
    }

    render() {

        const {screenProps: {translate}} = this.props;
        const {componentState} = this.state;
        const isComponentLoading = componentState === ComponentViewState.LOADING;
        const inputStyle = {
            containerStyle: style.inputContainer,
            labelStyle: style.inputLabel,
            inputStyle: style.input,
            forgotStyle: style.forgotStyle,
            errorStyle: style.errorStyle,
        };

        return (
            <SafeAreaView style = {appStyles.safeAreaView}>
                <KeyboardAwareScrollView>
                    <View style={style.rootView}>
                        <View style={style.header}>
                            <Image source={require('../../../assets/images/logo/logo.png')} style={style.logo}/>
                        </View>
                        <View>
                            <StringInput
                                label={translate('EMPLOYEE_LOGIN_SCREEN.EMPLOYEE_NUMBER')}
                                required={true}
                                autoFocus={true}
                                onceSubmitted={this.state.onceSubmitted}
                                editable={true}
                                style={inputStyle}
                                translate={this.props.screenProps.translate}
                                onChange={this.onEmpNumberChanged}
                                >
                            </StringInput>
                            <View style={style.storeIdContainer}>
                            <StringInput
                                label={translate('EMPLOYEE_LOGIN_SCREEN.STORE_ID')}
                                required={true}
                                autoFocus={false}
                                onceSubmitted={this.state.onceSubmitted}
                                editable={true}
                                style={inputStyle}
                                translate={this.props.screenProps.translate}
                                onChange={this.onStoreIdentifierChanged}
                                >
                            </StringInput>
                            </View>
                            <PasswordInput
                                label={translate('EMPLOYEE_LOGIN_SCREEN.PIN')}
                                autoFocus={false}
                                onceSubmitted={this.state.onceSubmitted}
                                editable={true}
                                style={inputStyle}
                                translate={this.props.screenProps.translate}
                                onChange={this.onPinChanged}
                            >
                            </PasswordInput>
                            <View>
                                <Button
                                 type={'btn-primary'}
                                 onPress={this.login}
                                 disabled={isComponentLoading}
                                 showActivityIndicator={isComponentLoading}
                                 text={translate('EMPLOYEE_LOGIN_SCREEN.SIGN_IN')}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
