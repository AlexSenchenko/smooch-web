import React, { Component } from 'react';

import { TextMessage } from 'components/text-message';
import { ImageMessage } from 'components/image-message';
import { ActionComponent } from 'components/action';


export class MessageComponent extends Component {
    static defaultProps = {
        actions: []
    };

    render() {
        const actions = this.props.actions.map((action) => {
            return <ActionComponent key={ action._id }
                                    {...action} />;
        });

        const isAppUser = this.props.role === 'appUser';

        const avatar = isAppUser ? null : (
            <img className='sk-msg-avatar'
                 src={ this.props.avatarUrl } />
            );

        const message = this.props.mediaUrl ?
            <ImageMessage {...this.props} /> :
            <TextMessage {...this.props} />;

        return <div className={ 'sk-row ' + (isAppUser ? 'sk-right-row' : 'sk-left-row') }>
                   { avatar }
                   <div className='sk-msg-wrapper'>
                       <div className='sk-from'>
                           { isAppUser ? '' : this.props.name }
                       </div>
                       <div className='sk-msg'>
                           { message }
                           { actions }
                       </div>
                   </div>
                   <div className='sk-clear'></div>
               </div>;
    }
}
