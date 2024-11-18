import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AutoForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  //폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    //하나라도 비어있을 떄
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸이 있습니다.빈칸을 채우세요');
      return;
    }
    if (password !== passwordConfirm) {
      //TODO: 오류처리
      setError('비밀번호가 일치하지 않습니다');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  //컴포넌트가 처음 렌더링될때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공 및 실패 처리
  useEffect(() => {
    if (authError) {
      //계정명이 이미 존재할때
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정입니다');
        return;
      }
      setError('회원가입 실패!');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     console.log('checkAPI 성공');
  //     console.log(user);
  //   }
  // }, [user]);

  //회원가입후에 user값이 잘 설정되었다면 홈 화면으로 이동
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('checkAPI 성공');
      console.log(user);
      navigate('/');

      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  return (
    <AutoForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};
export default RegisterForm;
