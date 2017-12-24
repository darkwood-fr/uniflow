import React, { Component } from 'react'
import $ from 'jquery'
import 'tag-it';
//import 'aehlke/tag-it/css/jquery.tagit.css!';
//import 'jquery-ui/themes/flick/jquery-ui.css!';

type Props = {
    value: string,
    options?: [],
}

export default class Ace extends Component<Props> {
    componentDidMount() {
        const {
            value,
            options
        } = this.props;

        this.silent = false;

        $(this.container)
            .val(value)
            .tagit(options)
            .on('change', (event) => {
                if (this.props.onChange && !this.silent) {
                    const value = $(this.container).tagit('assignedTags');
                    this.props.onChange(value, event);
                }
            })
    }

    componentWillUnmount() {
        $(this.container).off().tagit('destroy')
    }

    componentWillReceiveProps(nextProps) {
        const oldProps = this.props;

        if(nextProps.value !== oldProps.value) {
            this.silent = true;

            let tags = $(this.container).tagit('assignedTags'), i;

            for (i = 0; i < nextProps.value.length; i++) {
                if(tags.indexOf(nextProps.value[i]) === -1)
                {
                    $(this.container).tagit('createTag', nextProps.value[i]);
                }
            }

            for (i = 0; i < tags.length; i++) {
                if(nextProps.value.indexOf(tags[i]) === -1)
                {
                    $(this.container).tagit('removeTagByLabel', tags[i]);
                }
            }

            this.silent = false;
        }

        if(nextProps.options !== oldProps.options) {
            $(this.container).tagit(nextProps.options)
        }
    }

    render() {
        return (
            <input ref={container => (this.container = container)} />
        )
    }
}