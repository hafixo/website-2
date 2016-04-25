import React from 'react';

const Rule = ({ rule, isChecked, handleChange }) => (
    <div className="checkbox">
        <label>
            <input type="checkbox"
                checked={isChecked}
                id={rule}
                onChange={e => handleChange(e, rule)}
                />
            {rule}
        </label>
    </div>
)

const RulesConfig = React.createClass({
    getInitialState() {
        return this.props.config;
    },
    shouldBeChecked(rule) {
        const ruleValue = this.state[rule];
        return typeof ruleValue === 'string' ? ruleValue !== 'off' : ruleValue[0] !== 'off';
    },
    getRow(i) {
        const rules = Object.keys(this.state);
        const limit = Math.ceil(rules.length / 3);
        const start = limit * i;
        return Array(limit).fill('').map((_, j) => {
            const rule = rules[start + j];
            return rule && <Rule key={rule} rule={rule} isChecked={this.shouldBeChecked(rule)} handleChange={this.handleChange} />
        });
    },
    renderRules() {
        return [0, 1, 2].map((i) => (
            <div className="col-md-4" key={i}>
                {this.getRow(i)}
            </div>
        ))
    },
    handleChange(e, key) {
        let change = {};
        if (typeof this.state[key] === 'string') {
            change[key] = e.target.checked ? 'error' : 'off';
        } else {
            change[key] = this.state[key];
            change[key][0] = e.target.checked ? 'error' : 'off';
        }
        this.setState(change);
    },
    render: function() {
        return (
            <div className="row rules">
                <div className="container">
                    <div className="row"><div className="col-md-12"><h3>Rules</h3></div></div>
                    <div className="row">{this.renderRules()}</div>
                </div>
            </div>
        );
    }
});

export default RulesConfig;