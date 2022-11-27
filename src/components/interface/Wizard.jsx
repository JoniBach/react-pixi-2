import { ArrowBack, ArrowForward, Save } from "@styled-icons/material";
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const Wizard = ({ steps, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);

  const step = steps[activeStep];
  const title = `step ${activeStep + 1}: ${step?.title}`;
  const totalSteps = steps.length;
  const firstStep = activeStep === 0;
  const lastStep = activeStep === totalSteps - 1;

  const handleForwards = () => {setActiveStep(activeStep + 1)};

  const handleBackwards = () => {setActiveStep(activeStep - 1)};

  const handleSave = () => {
    onSave(true);
  };

  return (
    <Modal title={title}>
      {step.Component}
      <div className="flex">
        {!firstStep && (
          <Button onClick={() => handleBackwards()}>
            <ArrowBack size={20} />
            back
          </Button>
        )}
        <div className="w-full" />
        {!lastStep && (
          <Button onClick={() => handleForwards()}>
            next <ArrowForward size={20} />
          </Button>
        )}
        {lastStep && (
          <Button onClick={() => handleSave()}>
            <Save size={20} />
            save
          </Button>
        )}
      </div>
    </Modal>
  );
};
