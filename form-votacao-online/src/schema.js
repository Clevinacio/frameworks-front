import * as yup from 'yup';

yup.setLocale({
    string: {
        min: "Deve conter pelo menos 3 caracteres"
    },
});

const schema = yup.object().shape({
    statement: yup.string().min(3),
    option1: yup.string().required("Este campo é obrigatório"),
    option2: yup.string().required("Este campo é obrigatório"),
    option3: yup.string().notRequired(),
});

export { schema };