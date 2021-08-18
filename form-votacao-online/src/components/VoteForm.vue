<template>
    <div>
        <h2>Formulário de votação</h2>
        <form @submit.prevent="onSubmit" class="form-horizontal">
            <Input
                type="textarea"
                label="Enunciado"
                v-model="vt.statement"
                placeholder="Digite o enunciado da votação"
                isRequired="true"
                :error="errors['statement']"
                @input="touched['statement'] = true"
                @blur="checkField('statement')"
            />
            <br />
            <Input
                label="Opção 1"
                v-model="vt.option1"
                placeholder="Digite a 1ª opção"
                isRequired="true"
                :error="errors['option1']"
                @input="touched['option1'] = true"
                @blur="checkField('option1')"
            /><br />
            <Input
                label="Opção 2"
                v-model="vt.option2"
                placeholder="Digite a 2ª opção"
                isRequired="true"
                :error="errors['option2']"
                @input="touched['option2'] = true"
                @blur="checkField('option2')"
            /><br />
            <Input
                label="Opção 3"
                v-model="vt.option3"
                placeholder="Digite a 3ª opção"
                :error="errors['option3']"
                @input="touched['option3'] = true"
                @blur="checkField('option3')"
            /><br />
            <input class="create" type="submit" />{{ " " }}
            <button class="cancel" @click="$emit('cancel')">Cancelar</button>
        </form>
    </div>
</template>
<script>
import Input from "./Input.vue";
import { minLengthValidation, requiredValidation } from "./validations";

const validate = {
    statement: (value) => minLengthValidation(3, value),
    option1: requiredValidation,
    option2: requiredValidation,
};

export default {
    components: {
        Input,
    },
    props: ["vote"],
    data() {
        const { statement, options } = this.vote || {};
        const [option1, option2, option3] = options || [];
        return {
            vt: {
                statement: statement || "",
                option1: option1.option || "",
                option2: option2.option || "",
                option3: option3?.option || "",
            },
            errors: {},
            touched: {},
        };
    },
    methods: {
        checkField(name) {
            const value = this.vt[name];
            const error = validate[name] ? validate[name](value) : null;
            const nameError = this.touched[name] ? error : null;
            this.errors[name] = nameError;
        },
        onSubmit() {
            Object.keys(this.vt).forEach((field) => {
                this.touched[field] = true;
                this.checkField(field);
            });
            const errorsIsEmpty = !Object.values(this.errors).some((v) => v);
            if (errorsIsEmpty) {
                const options = [
                    {
                        option: this.vt.option1,
                        count: 0,
                    },
                    {
                        option: this.vt.option2,
                        count: 0,
                    },
                    {
                        option: this.vt.option3 || "",
                        count: 0,
                    },
                ].filter((o) => o && o.option.trim() !== "");
                this.$emit("update", {
                    statement: this.vt.statement,
                    options: options,
                });
            }
        },
    },
};
</script>
<style lang="scss">
</style>