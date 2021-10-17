import React, {useState} from 'react';
import api from '../api';
import '../styles/form.scss';
import PageTitle from '../components/PageTitle';
import PageContainer from '../components/PageContainer';
import InputWrapper from '../components/InputWrapper';
import SubmitBtn from '../components/SubmitBtn';
import Input from '../components/Input';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = () => {

        const [data, setData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            date: '',
        })

        const [errors, setErrors] = useState({
            firstName: {
                isInputValid: false,
                errorMessage: ''
            },
            lastName: {
                isInputValid: false,
                errorMessage: ''
            },
            email: {
                isInputValid: false,
                errorMessage: ''
            },
            date: {
                isInputValid: false,
                errorMessage: ''
            },
        })

        const eventCreateHandler = async (e) => {
            e.preventDefault();
            if (submitValidate(errors) === true) {
                await api.insertEvent(data).then(res => {
                    resetInputs();
                    console.log(res);
                    toast.success('Event created succesfully!', toastStyles);
                }).catch(error => {
                    toast.error('' + error, toastStyles);
                })
            } else {
                toast.error('Please correct the form', toastStyles);

            }
        }

        const onChangeHandler = (e) => {
            setData(prev => ({
                ...prev,
                [e.target.name]: e.target.value

            }));
        }

        const blurValidationHandler = (e, validationType) => {
            const {isInputValid, errorMessage} = blurValidate(e.target.value, validationType);
            setErrors(prev => ({
                ...prev,
                [e.target.name]: {
                    isInputValid: isInputValid,
                    errorMessage: errorMessage
                }
            }))
        }

        const submitValidate = (errors) => {
            return !(errors.email.isInputValid === false || errors.firstName.isInputValid === false
                || errors.lastName.isInputValid === false  || errors.date.isInputValid === false );
        }

        const resetInputs = () => {
            setData({
                firstName: '',
                lastName: '',
                email: '',
                date: ''
            })
        }

        const blurValidate = (isText, isValidationType) => {
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

        const toastStyles = {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        }

        return (
            <>
                <PageTitle text="Create-event.app"/>
                <PageContainer>
                    <form onSubmit={(e) => eventCreateHandler(e)}>
                        <InputWrapper>
                            <Input label='first name'
                                   name='firstName'
                                   type='text'
                                   placeholder='John'
                                   errors={errors?.firstName}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={blurValidationHandler}
                                   value={data?.firstName}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input label='last name'
                                   name='lastName'
                                   type='text'
                                   placeholder='Doe'
                                   errors={errors?.lastName}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={blurValidationHandler}
                                   value={data?.lastName}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input label='e-mail address'
                                   name='email'
                                   type='email'
                                   placeholder='john.doe@mail.com'
                                   errors={errors?.email}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={(e) => blurValidationHandler(e, 'email')}
                                   value={data?.email}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input label='Date'
                                   name='date'
                                   type='date'
                                   placeholder='25.10.2021'
                                   errors={errors?.date}
                                   onChangeHandler={onChangeHandler}
                                   validationHandler={blurValidationHandler}
                                   value={data?.date}
                            />
                        </InputWrapper>
                        <SubmitBtn/>
                    </form>
                </PageContainer>
                <ToastContainer/>
            </>
        );
    }
;

export default Form;