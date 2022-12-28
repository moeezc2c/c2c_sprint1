import React, { useState } from "react";
import PropTypes from "prop-types";

const Input = ({parentclass, label, labelfor, type, id,value, name,minLength,maxLength,placeholder, group,className, icon,required,handlerOnChange, children}) => {
// const Input = (props) => {

// const [cval, setCval] = useState(value);

    return (
        <div className={`form-group cyber-form-control ${parentclass}`}>
            {label && <label htmlFor={labelfor} className="form-label">{label}</label>}
            {(group == true) ?
                <div className={`${type === 'textarea' ? '' : 'input-group'}`}>
                    {icon && <span className="input-group-text" id={id}>{icon}</span>}
                    {(type === 'textarea') ?
                        <textarea 
                        // type={type ? type : 'text'} 
                        rows={6}
                        id={labelfor} 
                        name={name} 
                        value={value}
                        className={`form-control ${className}`} 
                        required={required}
                        minLength={minLength}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={handlerOnChange}></textarea>
                        :
                        <input 
                        type={type ? type : 'text'} 
                        id={labelfor} 
                        name={name} 
                        value={value}
                        className={`form-control ${className}`} 
                        required={required}
                        minLength={minLength}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={handlerOnChange}/>
                    }
                                       
                </div>
                :
                <>
                {(type === 'textarea') ?
                        <textarea 
                        // type={type ? type : 'text'} 
                        rows={6}
                        id={labelfor} 
                        name={name} 
                        value={value}
                        className={`form-control ${className}`} 
                        required={required}
                        minLength={minLength}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={handlerOnChange}></textarea>
                        :
                   <input 
                        type={type ? type : 'text'} 
                        id={labelfor} 
                        name={name} 
                        value={value}
                        className={`form-control ${className}`} 
                        required={required}
                        minLength={minLength}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={handlerOnChange}/>  
                }
                </>
            }
            
            {children}
        </div>
    )
}

// Input.propTypes = {
//     group: PropTypes.bool
// }

// Input.defaultProps = {
//     ...ComponentWithDefaultPropDefinitions.defaultProps
//  }

Input.propTypes = {
    // ...propTypes,
    parentclass: PropTypes.string,
    label: PropTypes.string,
    labelfor: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.string,
    group: PropTypes.bool,
    icon: PropTypes.any,
    required: PropTypes.bool,
    type:PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    // rest: PropTypes.any,
    children: PropTypes.element
  };

export default Input;