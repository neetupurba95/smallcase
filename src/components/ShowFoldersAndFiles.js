import React from "react";
import { Accordion, Icon } from "semantic-ui-react";

class ShowFoldersAndFiles extends React.Component {
    state = { activeIndex: 0 }

    render() {
        const { activeIndex, index, value } = this.props
        return (
            <Accordion>
                <Accordion.Title active={activeIndex === (index)}
                    index={index} onClick={this.props.handleAccordionClick}>
                    <Icon name='dropdown' />
                    {value}
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === (index)}>
                </Accordion.Content>
            </Accordion>
        )
    }
}

export default ShowFoldersAndFiles;