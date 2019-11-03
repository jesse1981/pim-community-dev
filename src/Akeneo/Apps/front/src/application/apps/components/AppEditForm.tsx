import React, {ChangeEvent, Dispatch, useRef, useEffect} from 'react';
import {FlowType} from '../../../domain/apps/flow-type.enum';
import {Form, FormGroup, FormInput, Section} from '../../common';
import {FlowTypeSelect} from './FlowTypeSelect';
import {FormState, Actions} from '../reducers/app-form-reducer';
import {Translate} from '../../shared/translate';

interface Props {
    state: FormState;
    dispatch: Dispatch<Actions>;
}

export const AppEditForm = ({state, dispatch}: Props) => {
    const labelInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = labelInputRef.current;
        if (null === input) {
            return;
        }

        const name = input.name;
        if (true === state.controls[name].validated) {
            return;
        }

        if (false === input.checkValidity()) {
            if (input.validity.valueMissing) {
                dispatch({
                    type: 'ERROR',
                    name,
                    code: `akeneo_apps.constraint.${name}.required`,
                });
            }
        }

        dispatch({
            type: 'SET_VALIDATED',
            name,
        });
    }, [state, dispatch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch({type: 'CHANGE', name: event.currentTarget.name, value: event.currentTarget.value});

    const handleFlowTypeSelect = (flowType: FlowType) => dispatch({type: 'CHANGE', name: 'flow_type', value: flowType});

    return (
        <>
            <Section title={<Translate id='pim_apps.edit_app.subtitle' />} />

            <Form>
                <FormGroup controlId='code' label='pim_apps.app.code'>
                    <FormInput type='text' value={state.controls.code.value} disabled />
                </FormGroup>

                <FormGroup
                    controlId='label'
                    label='pim_apps.app.label'
                    errors={Object.keys(state.controls.label.errors)}
                >
                    <FormInput
                        ref={labelInputRef}
                        type='text'
                        name='label'
                        value={state.controls.label.value}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </FormGroup>

                <FormGroup
                    controlId='flow_type'
                    label='pim_apps.app.flow_type'
                    errors={Object.keys(state.controls.flow_type.errors)}
                >
                    <FlowTypeSelect
                        value={state.controls.flow_type.value as FlowType}
                        onChange={handleFlowTypeSelect}
                    />
                </FormGroup>
            </Form>
        </>
    );
};
