<script>
    import { createEventDispatcher } from "svelte";
    import { schema } from "../schema";
    import {
        Button,
        Form,
        FormGroup,
        FormText,
        Input,
        Label,
    } from "sveltestrap";
    const dispatch = createEventDispatcher();

    export let vote;

    const { statement, options } = vote || {};
    const [option1, option2] = options || [];
    const option3 = options[2] || { option: "", count: 0 };

    let values = {
        statement: statement,
        option1: option1.option,
        option2: option2.option,
        option3: option3.option,
    };

    let errors = {};

    const extractErrors = (err) => {
        return err.inner.reduce((acc, err) => {
            return { ...acc, [err.path]: err.message };
        }, {});
    };

    const submitHandler = () => {
        schema
            .validate(values, { abortEarly: false })
            .then(() => {
                const fullOptions = [
                    {
                        option: values.option1,
                        count: 0,
                    },
                    {
                        option: values.option2,
                        count: 0,
                    },
                    {
                        option: values.option3,
                        count: 0,
                    },
                ];
                const filteredOptions = fullOptions.filter(
                    (option) => option && option.option.trim() !== ""
                );
                dispatch("update", {
                    statement: values.statement,
                    options: filteredOptions,
                });
                errors = {};
            })
            .catch((err) => (errors = extractErrors(err)));
    };
</script>

<div>
    <h2>Formulário</h2>
    <form on:submit|preventDefault={submitHandler}>
        <FormGroup>
            <Label for="statement">Enunciado da votação</Label>
            <Input
                type="textarea"
                name="statement"
                bind:value={values.statement}
                placeholder="Digite o enunciado..."
                invalid={errors.statement}
                feedback={errors.statement}
            />
        </FormGroup>
        <FormGroup>
            <Label for="option1">Opção 1</Label>
            <Input
                type="text"
                name="option1"
                bind:value={values.option1}
                placeholder="Opção 1..."
                invalid={errors.option1}
                feedback={errors.option1}
            />
        </FormGroup>
        <FormGroup>
            <Label for="option2">Opção 2</Label>
            <Input
                type="text"
                name="option2"
                bind:value={values.option2}
                placeholder="Opção 2..."
                invalid={errors.option2}
                feedback={errors.option2}
            />
        </FormGroup>
        <FormGroup>
            <Label for="option3">Opção 3</Label>
            <Input
                type="text"
                name="option3"
                bind:value={values.option3}
                placeholder="Opção 3..."
            />
        </FormGroup>
        <Button color="primary" type="submit">Enviar</Button>
        <Button color="secondary" on:click={(e) => dispatch("cancel")}
            >Cancelar
        </Button>
    </form>
</div>

<style lang="scss">
</style>
