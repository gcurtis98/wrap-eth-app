import './WrapForm.css';
import { useState } from 'react';
import FormInput from './FormInput';
import Wrap from '../../AccountLibrary/Wrap';

function WrapForm(props) {
    const [state, setState] = useState({
        inputCoin: 'ETH',
        inputValue: '',
        outputCoin: 'wETH',
        outputValue: ''
    });
    let accountBalances = {
        inputBalance: state.inputCoin === 'ETH' ? props.accountData.ethBalance : props.accountData.wethBalance,
        outputBalance: state.outputCoin === 'ETH' ? props.accountData.ethBalance : props.accountData.wethBalance
    }
    let btnText = '';
    if (!parseFloat(state.inputValue) > 0) btnText = 'Enter an amount';
    else {
        
        if (parseFloat(state.inputValue) > parseFloat(accountBalances.inputBalance)) btnText = 'Insufficient ' + state.inputCoin + ' balance';
        else btnText = state.inputCoin === 'ETH' ? 'Wrap' : 'Unwrap';
    }

    const switchCoins = () => {
        setState((prevState) => {
            return {
                inputCoin: prevState.outputCoin,
                inputValue: prevState.outputValue,
                outputCoin: prevState.inputCoin,
                outputValue: prevState.inputValue
            }
        })
    }
    const inputChangeHandler = (data) => {
        setState((prevState) => {
            return { ...prevState, inputValue: data.value, outputValue: data.value }
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onTransaction(Wrap(state));
    }

    return (
        <form onSubmit={submitHandler}>
            <FormInput coin={state.inputCoin} isInput={true} value={state.inputValue} balance={accountBalances.inputBalance}
                displayBalance={props.accountData.address?.length > 0} onInputChange={inputChangeHandler} theme = {props.theme}></FormInput>
            <div className={'down-arrow down-arrow__' + props.theme} onClick={switchCoins}></div>
            <FormInput coin={state.outputCoin} isInput={false} value={state.outputValue} balance={accountBalances.outputBalance}
                displayBalance={props.accountData.address?.length > 0} onInputChange={inputChangeHandler} theme = {props.theme}></FormInput>
            <button type='submit'  
            className={btnText === 'Wrap' || btnText === 'Unwrap' ? 'wrap-btn wrap-btn__' + props.theme : 'btn-disabled btn-disabled__' + props.theme + ' wrap-btn wrap-btn__' + props.theme}>
                {btnText}</button>
        </form>
    );
}

export default WrapForm;
