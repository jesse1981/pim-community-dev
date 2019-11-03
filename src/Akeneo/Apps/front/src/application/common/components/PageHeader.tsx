import React, {PropsWithChildren, ReactElement, ReactNode, Fragment} from 'react';

type Props = PropsWithChildren<{
    breadcrumb?: ReactElement;
    buttons?: ReactElement[];
    userButtons?: ReactNode;
}>;

export const PageHeader = ({children: title, breadcrumb, buttons, userButtons}: Props) => (
    <header className='AknTitleContainer'>
        <div className='AknTitleContainer-line'>
            <div className='AknImage AknImage--readOnly'>
                <img
                    className='AknImage-display'
                    src='/media/show/5%252Fd%252F7%252Fc%252F5d7c9e5499b2a646fbb3d29a309370088768f907_city.jpg/thumbnail'
                />
            </div>

            <div className='AknTitleContainer-mainContainer'>
                <div className='AknTitleContainer-line'>
                    <div className='AknTitleContainer-breadcrumbs'>{breadcrumb}</div>
                    <div className='AknTitleContainer-buttonsContainer'>
                        {userButtons}
                        {buttons && (
                            <div className='AknTitleContainer-actionsContainer AknButtonList'>
                                {buttons.map((button, index) => (
                                    <Fragment key={index}>{button}</Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='AknTitleContainer-line'>
                    <div className='AknTitleContainer-title'>{title}</div>
                    <div className='AknTitleContainer-state' />
                </div>

                <div className='AknTitleContainer-line'>
                    <div className='AknTitleContainer-context AknButtonList' />
                </div>

                <div className='AknTitleContainer-line'>
                    <div className='AknTitleContainer-meta AknButtonList' />
                </div>
            </div>
        </div>

        <div className='AknTitleContainer-line'>
            <div className='AknTitleContainer-navigation' />
        </div>

        <div className='AknTitleContainer-line'>
            <div className='AknTitleContainer-search' />
        </div>
    </header>
);
