import React, {useReducer} from 'react';
import {useHistory, useParams} from 'react-router';
import {PimView} from '../../../infrastructure/pim-view/PimView';
import {ApplyButton, Breadcrumb, BreadcrumbItem, PageHeader, Page} from '../../common';
import {BreadcrumbRouterLink} from '../../shared/router';
import {Translate} from '../../shared/translate';
import {FlowType} from '../../../domain/apps/flow-type.enum';
import {AppEditForm} from '../components/AppEditForm';
import {appFormReducer, FormState} from '../reducers/app-form-reducer';

export const AppEdit = () => {
    const history = useHistory();

    const breadcrumb = (
        <Breadcrumb>
            <BreadcrumbRouterLink route={'oro_config_configuration_system'}>
                <Translate id='pim_menu.tab.system' />
            </BreadcrumbRouterLink>
            <BreadcrumbItem onClick={() => history.push('/apps')} isLast={false}>
                <Translate id='pim_menu.item.apps' />
            </BreadcrumbItem>
        </Breadcrumb>
    );

    const userButtons = (
        <PimView
            className='AknTitleContainer-userMenuContainer AknTitleContainer-userMenu'
            viewName='pim-apps-user-navigation'
        />
    );

    const {code} = useParams() as {code: string};
    const app = {
        code,
        label: code,
        flow_type: FlowType.DATA_DESTINATION,
    };

    const initialState: FormState = {
        controls: {
            code: {name: 'code', value: app.code, errors: {}, dirty: false, valid: true, validated: true},
            label: {name: 'label', value: app.label, errors: {}, dirty: false, valid: true, validated: true},
            flow_type: {
                name: 'flow_type',
                value: app.flow_type,
                errors: {},
                dirty: false,
                valid: true,
                validated: true,
            },
        },
        valid: true,
    };

    const [state, dispatch] = useReducer(appFormReducer, initialState);

    const saveButton = (
        <ApplyButton onClick={() => undefined} classNames={['AknButtonList-item']}>
            <Translate id='pim_common.save' />
        </ApplyButton>
    );

    return (
        <Page>
            <PageHeader breadcrumb={breadcrumb} buttons={[saveButton]} userButtons={userButtons}>
                {app.label}
            </PageHeader>

            <AppEditForm state={state} dispatch={dispatch} />
        </Page>
    );
};
