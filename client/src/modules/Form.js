import React, {useState} from 'react';
import api from "../api";
import "../styles/form.scss";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import InputWrapper from "../components/InputWrapper";
import SubmitBtn from "../components/SubmitBtn";
import Input from "../components/Input";


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
            const currentErrors = errors;
            const currentData = data;
            await api.insertEvent(currentData).then(res => {
                window.alert('Event created succesfully!');
                console.log(res);
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

        const validationHandler = (e, validationType) => {
            const {isInputValid, errorMessage} = validateInput(e.target.value, validationType);
            setErrors(prev => ({
                ...prev,
                [e.target.name]: {
                    isInputValid: isInputValid,
                    errorMessage: errorMessage
                }
            }))
        }

        const validateInput = (isText, isValidationType) => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

            if (isText && isValidationType && emailRegex.exec(isText) === null) {
                return {
                    isInputValid: false,
                    errorMessage: 'email is not valid'
                }
            } else if (isText) {
                return {
                    isInputValid: true,
                    errorMessage: ''
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
                            <Input label="first name"
                                   name="firstName"
                                   type="text"
                                   placeholder="John"
                                   errors={errors?.firstName}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={validationHandler}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input label="last name"
                                   name="lastName"
                                   type="text"
                                   placeholder="Doe"
                                   errors={errors?.lastName}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={validationHandler}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input label="e-mail address"
                                   name="email"
                                   type="email"
                                   placeholder="john.doe@mail.com"
                                   errors={errors?.email}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={(e) => validationHandler(e, "email")}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input label="Date"
                                   name="date"
                                   type="date"
                                   placeholder="25.10.2021"
                                   errors={errors?.date}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={validationHandler}
                            />
                        </InputWrapper>
                        <SubmitBtn/>
                    </form>
                </PageContainer>
            </>
        );
    }
;

export default Form;