
import { paymentTypeGet } from '../../actions/postJob';
import React, { useEffect, useState } from 'react';
import { setAlert } from '../../actions/alert';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { contractAdd } from '../../actions/proposalAndContract';
import Input from '../../components/input/input';

const fixed_hour_schema = {
  fixed_price: 0,
  deposit_type: "Complete",
  milestone: [],
  due_date: null,
}

const hourly_formData_schema = {
  hourly_rates: 0,
  weekly_limits: false,
  weekly_limit_rates: 0,
}

const milestone_formData_schema = {
  milestone_name: "",
  milestone_description: "",
  milestone_start: null,
  milestone_end: null,
  milestone_status: "Not Started",
  milestone_percentage: 0,
  milestone_amount: 0,
}

const StartContract = ({ postJob: { paymentTypeVal },proposalAndContract:{ContractInitialization}, paymentTypeGet,setAlert, contractAdd }) => {

  const [paymentOptions, setPaymentOptions] = useState([]);
  const [payment_type_id, set_payment_type_id] = useState(null);
  const [fixed_hour_formData, set_fixed_hour_formData] = useState({
    ...fixed_hour_schema,
  });
  const [hourly_formData, set_hourly_formData] = useState({
    ...hourly_formData_schema
  });

  console.log("🚀 ~ file: index.js ~ line 45 ~ StartContract ~ hourly_formData", hourly_formData)
  
  const [milestone_formData, set_milestone_formData] = useState({
    ...milestone_formData_schema
  });

  const history = useHistory();

  useEffect(() => {
    paymentTypeGet()
  }, []);

  useEffect(() => {
    if (payment_type_id) {
      set_fixed_hour_formData({ ...fixed_hour_schema });
      set_hourly_formData({ ...hourly_formData_schema });
      set_milestone_formData({ ...milestone_formData_schema });
    }
  }, [payment_type_id]);

  useEffect(() => {
    if (paymentTypeVal.length > 0) {
      setPaymentOptions(paymentTypeVal.map(item => ({
        value: item._id,
        label: item.type_name,
        ...item
      })))
    }
  }, [paymentTypeVal]);

  const addMilestone = () => {

    const {milestone_name,milestone_description,milestone_start,milestone_end,milestone_percentage,milestone_amount} = milestone_formData;

    if(!milestone_name||
    !milestone_description||
    !milestone_start ||
    !milestone_end ||
    !milestone_percentage ||
    !milestone_amount){
      toast.error("All feilds are required")
      return;
    }
    set_fixed_hour_formData({ ...fixed_hour_formData, milestone: [...fixed_hour_formData.milestone, milestone_formData] });
    set_milestone_formData({ ...milestone_formData_schema });
  }

  const submitDisabled = () => {
    const { fixed_price, deposit_type, milestone, due_date } = fixed_hour_formData;
    const { hourly_rates, weekly_limits, weekly_limit_rates } = hourly_formData;
    if(!payment_type_id){
      toast.error("Please select payment type")
      return true;
    }
    if (payment_type_id.type_name === "Fixed") {
      if (!fixed_price) {
        toast.error("Please enter fixed price")
        return true;
      }
      if (!deposit_type) {
        toast.error("Please select deposit type")
        return true;
      }
      if (deposit_type === "Milestone" && !milestone.length) {
        toast.error("Please add milestone")
        return true;
      }
      if (!due_date) {
        toast.error("Please add due date")
        return true;
      }
    }
    if (payment_type_id.type_name === "Hourly") {
      if (!hourly_rates) {
        toast.error("Please enter hourly rates")
        return true;
      }
      if (weekly_limits) {
        if (!weekly_limit_rates) {
          toast.error("Please enter weekly limit rates")
          return true;
        }
      }
    }
    return false;
  }

  const submit = () => {
    if (submitDisabled()) {
      return;
    }
    let Fixeddata = {
      ...ContractInitialization,
      payment_type_id:payment_type_id._id,
      fixed_contract:fixed_hour_formData,
      contract_type:payment_type_id.type_name,
    }
    let Hourlydata = {
      ...ContractInitialization,
      payment_type_id:payment_type_id._id,
      hourly_contract: hourly_formData,
      contract_type:payment_type_id.type_name,
    }

    if (payment_type_id.type_name === "Fixed") {
      contractAdd(Fixeddata,()=>history.push("/dashboard"));
    }else{
      contractAdd(Hourlydata,()=>history.push("/dashboard"));
    }

  }

  const reset = () => {
    set_fixed_hour_formData({ ...fixed_hour_schema });
    set_hourly_formData({ ...hourly_formData_schema });
    set_milestone_formData({ ...milestone_formData_schema });
    set_payment_type_id(null);
  }

  const cancel = () => {
    reset();
    history.goBack();
  }

  return (
    <div className="main-page page-dashboard">
      <div className="container">

      <section className="panel-box">
      <div className="panel-box--wrap">

        <header className='panel-box--header'>
          <h2 className="panel-box--title">Start Contract</h2>
        </header>
      <main className='panel-box--body'>
        <div className="row">

          <div className="form-group col-lg-6 col-md-6 col-sm-12">
            <label className="form-label">Payment Option</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={payment_type_id}
              options={paymentOptions}
              disabled={paymentOptions.length === 0}
              onChange={set_payment_type_id}
            />
          </div>

          {payment_type_id && payment_type_id.type_name === 'Hourly' &&
          <div className="form-group col-lg-6 col-md-6 col-sm-12">
                    {/* <label className="form-label d-block">&nbsp;</label> */}
            <label className="form-label">Weekly Limit</label>
            <div className="clearfix mt-2">
            <input className="form-checkbox" type="checkbox" name="weekly_limits" onChange={(e) => set_hourly_formData({ ...hourly_formData, [e.target.name]: e.target.checked })}/>
            </div>
          </div>
          }

          {payment_type_id && payment_type_id.type_name === 'Fixed' && 
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label className="form-label">Fixed Price</label>
              <input type="number" name="fixed_price" className="form-control" onChange={(e) => set_fixed_hour_formData({ ...fixed_hour_formData, [e.target.name]: e.target.value })}></input>
            </div>}

        </div>

        {payment_type_id && payment_type_id.type_name === 'Hourly' && <>
              {/* <Input 
              label={`Pay by the hour`}
              group={false}
              name={`hourly_rates`}
              required={true}
              type={'number'}
              handlerOnChange={(e) => set_hourly_formData({ ...hourly_formData, [e.target.name]: e.target.value })}
              >
              <span className="error-text">Error</span> 
              </Input> */}

              <div className="row">
                  <div className="form-group col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label">Pay by the hour</label>
                    <input type="number" name="hourly_rates" className="form-control" onChange={(e) => set_hourly_formData({ ...hourly_formData, [e.target.name]: e.target.value })}/>
                  </div>

                  

                  {hourly_formData.weekly_limits && <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Weekly Limit hour</label>
                    <input type="number" name="weekly_limit_rates" className="form-control" onChange={(e) => set_hourly_formData({ ...hourly_formData, [e.target.name]: e.target.value })}>
                    </input>
                  </div>}

              </div>
        </>}

        {payment_type_id && payment_type_id.type_name === 'Fixed' &&
          <>
            

            <div className="form-group mt-3">
              <h4>Deposit Fund into escrow</h4>

              <div className="form-check mb-3">
                <label className="form-check-label" for="flexRadioDefault1">
                <input type="radio" value="Complete" name="deposit_type" id="flexRadioDefault1" onChange={(e) => set_fixed_hour_formData({ ...fixed_hour_formData, [e.target.name]: e.target.value })} checked>
                </input> Deposit Complete Amount
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label" for="flexRadioDefault2">
                <input type="radio" value="Milestone" name="deposit_type" onChange={(e) => set_fixed_hour_formData({ ...fixed_hour_formData, [e.target.name]: e.target.value })} id="flexRadioDefault2" >
                </input> Deposit Partial Amount to cover first milestone
                </label>
              </div>
            </div>

            {fixed_hour_formData.deposit_type === 'Milestone' &&
              <div className="row my-5">
                <h4 className="col-12">Milestones</h4>
                <div className="form-group col-12">
                  <table className="table table-striped table-bordered w-100">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Percentage</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fixed_hour_formData.milestone.map((item, index) => (
                        <tr key={index}>
                          <td>{item.milestone_name}</td>
                          <td>{item.milestone_description}</td>
                          <td>{item.milestone_start}</td>
                          <td>{item.milestone_end}</td>
                          <td>{item.milestone_percentage}</td>
                          <td>{item.milestone_amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Milestone Name</label>
                  <input type="text" name="milestone_name" className="form-control" value={milestone_formData.milestone_name} onChange={(e) => set_milestone_formData({ ...milestone_formData, [e.target.name]: e.target.value })}></input>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Milestone Description</label>
                  <input type="text" name="milestone_description" className="form-control" value={milestone_formData.milestone_description} onChange={(e) => set_milestone_formData({ ...milestone_formData, [e.target.name]: e.target.value })}></input>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Start Date</label>
                  <input type="date" name="milestone_start" className="form-control" value={milestone_formData.milestone_start} onChange={(e) => set_milestone_formData({ ...milestone_formData, [e.target.name]: e.target.value })}></input>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">End Date</label>
                  <input type="date" name="milestone_end" className="form-control" value={milestone_formData.milestone_end} onChange={(e) => set_milestone_formData({ ...milestone_formData, [e.target.name]: e.target.value })}></input>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Milestone Percentage</label>
                  <input type="number" name="milestone_percentage" className="form-control" value={milestone_formData.milestone_percentage} onChange={(e) => set_milestone_formData({ ...milestone_formData, [e.target.name]: e.target.value })}></input>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Milestone Amount</label>
                  <input type="number" name="milestone_amount" className="form-control" value={milestone_formData.milestone_amount} onChange={(e) => set_milestone_formData({ ...milestone_formData, [e.target.name]: e.target.value })}></input>
                </div>
                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <button className="btn btn-primary" onClick={() => addMilestone()}>Add Milestone</button>
                </div>
              </div>
            }
            
            <div className="row mt-4">
              <div className="form-group col-lg-6 col-md-6 col-sm-12">
                <label className="form-label">Due Date</label>
                <input type="date" name="due_date" className="form-control" onChange={(e) => set_fixed_hour_formData({ ...fixed_hour_formData, [e.target.name]: e.target.value })}></input>
              </div>
            </div>
          </>
        }
        
      </main>
      <footer className='panel-box--footer'>
        <div className="btn-btn-group-justified text-right">
          <button className="btn btn-primary mx-1" onClick={() => submit()}>Submit</button>
          <button className="btn btn-secondary mx-1" onClick={() => reset({})}>Reset</button>
          <button className="btn btn-secondary mx-1" onClick={() => cancel({})}>Cancel</button>
        </div>
      </footer>

      </div>
      </section>

    </div>
    </div>
  )
}

const mapStateToProp = (state) => ({
  postJob: state.postJob,
  proposalAndContract: state.proposalAndContract
})

export default connect(mapStateToProp, { paymentTypeGet, setAlert, contractAdd })(StartContract)