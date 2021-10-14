import React, {useState} from 'react';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
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

    const validationSchema = yup.object().shape({
        firstName: yup.string()
            .required("this field is required"),
        lastName: yup.string()
            .required("this field is required"),
        email: yup.string()
            .required("this field is required")
            .email("email address is not valid"),
        date: yup.string()
            .required("this field is required"),
    });

    const {handleSubmit, register, formState: {errors}, reset} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const eventCreateHandler = async () => {
        const currentData = data;
        await api.insertEvent(currentData).then(res => {
            window.alert('Event created succesfully!');
            console.log(currentData);
            console.log(res);
        }).catch(error => {
            window.alert(error + " - try again later");
        })
        reset();
    }

    const onChangeHandler = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <>
            <PageTitle />
            <PageContainer>
                <form onSubmit={handleSubmit(eventCreateHandler)}>
                    <InputWrapper>
                        <label htmlFor="firstName">first name</label>
                        <input type="text"
                               autoComplete="nope"
                               className={!errors?.firstName ? "correct-input" : "error-input"}
                               id="firstName"
                               placeholder="John"
                               {...register("firstName")}
                               onChange={onChangeHandler}
                        />
                        <ErrorMsgContainer errors={errors} name="firstName" />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="lastName">last name</label>
                        <input type="text"
                               autoComplete="nope"
                               className={!errors?.lastName ? "correct-input" : "error-input"}
                               id="lastName"
                               placeholder="Doe"
                               {...register("lastName")}
                               onChange={onChangeHandler}
                        />
                        <ErrorMsgContainer errors={errors} name="lastName" />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="email">email</label>
                        <input type="email"
                               autoComplete="nope"
                               className={!errors?.email ? "correct-input" : "error-input"}
                               id="email"
                               placeholder="john.doe@mail.com"
                               {...register("email")}
                               onChange={onChangeHandler}
                        />
                        <ErrorMsgContainer errors={errors} name="email" />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="date">date</label>
                        <input type="date"
                               autoComplete="nope"
                               className={!errors?.date ? "correct-input" : "error-input"}
                               id="date"
                               {...register("date")}
                               onChange={onChangeHandler}
                        />
                        <ErrorMsgContainer errors={errors} name="date" />
                    </InputWrapper>
                    <SubmitBtn />
                </form>
            </PageContainer>
        </>
    );
};

export default Form;