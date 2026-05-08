import { useState } from "react";
import { STEPS, INITIAL_FORM } from "../helpfunction/constants";
import { useWorkflow } from "../../../context/WorkflowContext";

export function useGrievanceForm(user) {
  const { submitComplaint } = useWorkflow();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [grn, setGrn] = useState(null);
  const [questionInput, setQuestionInput] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const addCustomQuestion = () => {
    if (!questionInput.trim()) return;
    setQuestionAnswers((prev) => [
      ...prev,
      { q: questionInput, a: "Your question has been noted. You may proceed with filing." },
    ]);
    setQuestionInput("");
  };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.category) e.category = "Please select a category";
      if (!form.subject.trim()) e.subject = "Please enter a subject";
      if (!form.description.trim()) e.description = "Please describe the grievance";
    }
    if (step === 2) {
      if (!form.respondentName.trim()) e.respondentName = "Respondent name is required";
      if (!form.respondentEmail.trim()) e.respondentEmail = "Email is required";
      if (!form.respondentType) e.respondentType = "Please select respondent type";
    }
    if (step === 4) {
      if (!form.agreedToTerms) e.agreedToTerms = "You must agree to the declaration";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const newGrn = submitComplaint({
      subject:     form.subject,
      description: form.description,
      priority:    "Medium",
      category:    form.category,
      filedBy: {
        userId: user?.id   ?? "",
        name:   user?.name ?? "Citizen",
        email:  user?.email ?? "",
      },
      formData: form,
    });
    setGrn(newGrn);
    setSubmitted(true);
  };

  return {
    step, setStep,
    form,
    errors,
    submitted,
    grn,
    questionInput, setQuestionInput,
    questionAnswers,
    addCustomQuestion,
    set,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
