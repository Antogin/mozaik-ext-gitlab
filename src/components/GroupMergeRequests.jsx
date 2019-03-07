import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import MergeRequestItem                          from './MergeRequest';


class GroupMergeRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mergeRequests:  [],
            group:  [],
            query: {}
        };
    }

    getApiRequest() {
        const { group, query } = this.props;

        return {
            id:     `gitlab.groupMergeRequests.${ group }`,
            params: { group, query }
        };
    }

    onApiData({ group, mergeRequests }) {
        this.setState({ group, mergeRequests });
    }

    render() {
        const { mergeRequests } = this.state;

        return (
            <div>
                <div className="widget__header">
                    MergeRequests
                    <span className="widget__header__count">
                        {mergeRequests.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {mergeRequests.map(mr => (<MergeRequestItem mergeRequest={mr}/>))}
                </div>
            </div>
        );
    }
}

GroupMergeRequests.propTypes = {
    group: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(GroupMergeRequests.prototype, ListenerMixin);
reactMixin(GroupMergeRequests.prototype, Mozaik.Mixin.ApiConsumer);


export default GroupMergeRequests;
