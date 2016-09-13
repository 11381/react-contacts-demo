import React, {
    Component,
    PropTypes,
} from 'react';

class SimpleError extends Component {
    render() {
        return (
            <div>
                <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>
                    <span className="sr-only">Error:</span>
                    &nbsp;{this.props.error}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

SimpleError.propTypes = {
    error: PropTypes.string
};

export default SimpleError;