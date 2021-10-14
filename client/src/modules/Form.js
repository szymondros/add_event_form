import React, {useState} from 'react';
import api from "../api";
import "../styles/form.scss";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import ErrorMsgContainer from "../components/ErrorMsgContainer";
import InputWrapper from "../components/InputWrapper";
import SubmitBtn from "../components/SubmitBtn";


const Form = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
    })

    const [errors, setErrors] = useState({
        firstName: {
            isInputValid: true,
            errorMessage: ''
        },
        lastName: {
            isInputValid: true,
            errorMessage: ''
        },
        email: {
            isInputValid: true,
            errorMessage: ''
        },
        date: {
            isInputValid: true,
            errorMessage: ''
        },
    })

    const eventCreateHandler = async (e) => {
        e.preventDefault();
        const currentData = data;
        await api.insertEvent(currentData).then(res => {
            window.alert('Event created succesfully!');
            console.log(currentData);
        }).catch(error => {
            window.alert(error + " - try again later");
        })
    }

    const onChangeHandler = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value

        }));
    }

    const validationHandler = (e, type) => {
        if (type === "email") {
            const {isInputValid, errorMessage} = validateInput(e.target.value, type);
            setErrors(prev => ({
                ...prev,
                [e.target.name]: {
                    isInputValid: isInputValid,
                    errorMessage: errorMessage
                }
            }))
        } else {
            const {isInputValid, errorMessage} = validateInput(e.target.value);
            setErrors(prev => ({
                ...prev,
                [e.target.name]: {
                    isInputValid: isInputValid,
                    errorMessage: errorMessage
                }
            }))
        }


    }

    const validateInput = (checkingText, checkingEmail) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (checkingText) {
            if (emailRegex.exec(checkingEmail) !== null) {
                return {
                    isInputValid: true,
                    errorMessage: ''
                }
            } else {
                return {
                    isInputValid: false,
                    errorMessage: 'e-mail address is not valid'
                }
            }
        } else {
            return {
                isInputValid: false,
                errorMessage: 'This field is required'
            }
        }
    }

    return (
        <>
            <PageTitle/>
            <PageContainer>
                <form onSubmit={(e) => eventCreateHandler(e)}>
                    <InputWrapper>
                        <label htmlFor="firstName">first name</label>
                        <input type="text"
                               name="firstName"
                               autoComplete="nope"
                               className={errors?.firstName?.isInputValid ? "correct-input" : "error-input"}
                               id="firstName"
                               placeholder="John"
                               onChange={(e) => onChangeHandler(e)}
                               onBlur={(e) => validationHandler(e)}
                        />
                        <ErrorMsgContainer errors={errors?.firstName} name="firstName"/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="lastName">last name</label>
                        <input type="text"
                               name="lastName"
                               autoComplete="nope"
                               className={errors?.lastName?.isInputValid ? "correct-input" : "error-input"}
                               id="lastName"
                               placeholder="Doe"
                               onChange={(e) => onChangeHandler(e)}
                               onBlur={(e) => validationHandler(e)}
                        />
                        <ErrorMsgContainer errors={errors?.lastName}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="email">email</label>
                        <input type="email"
                               name="email"
                               autoComplete="nope"
                               className={errors?.email?.isInputValid ? "correct-input" : "error-input"}
                               id="email"
                               placeholder="john.doe@mail.com"
                               onChange={(e) => onChangeHandler(e)}
                               onBlur={(e) => validationHandler(e, e.target.name)}
                        />
                        <ErrorMsgContainer errors={errors?.email}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="date">date</label>
                        <input type="date"
                               name="date"
                               autoComplete="nope"
                               className={errors?.date?.isInputValid ? "correct-input" : "error-input"}
                               id="date"
                               onChange={(e) => onChangeHandler(e)}
                               onBlur={(e) => validationHandler(e)}
                        />
                        <ErrorMsgContainer errors={errors?.date}/>
                    </InputWrapper>
                    <SubmitBtn/>
                </form>
            </PageContainer>
        </>
    );
};

export default Form;