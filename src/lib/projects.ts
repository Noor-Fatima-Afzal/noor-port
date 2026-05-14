import neuroai from "@/assets/proj-neuroai.jpg";
import seizure from "@/assets/proj-seizure.jpg";
import ragXray from "@/assets/proj-rag-xray.jpg";
import sleep from "@/assets/proj-sleep.jpg";
import multiview from "@/assets/proj-multiview.jpg";
import dental from "@/assets/proj-dental.jpg";
import groqvision from "@/assets/proj-groqvision.jpg";
import audio from "@/assets/proj-audio.jpg";
import edupath from "@/assets/proj-edupath.jpg";
import lahore from "@/assets/proj-lahore.jpg";
import lawyer from "@/assets/proj-lawyer.jpg";
import madina from "@/assets/proj-madina.jpg";
import crane from "@/assets/proj-crane.jpg";
import clinical from "@/assets/proj-clinical.jpg";
import neurogenesis from "@/assets/proj-neurogenesis.jpg";
import breast from "@/assets/proj-breast.jpg";
import emotion from "@/assets/proj-emotion.jpg";
import gnnPdm from "@/assets/proj-gnn-pdm.jpg";
import neurographTsc from "@/assets/proj-neurograph-tsc.jpg";
import obeRubrics from "@/assets/proj-obe-rubrics.jpg";
import olympics from "@/assets/proj-olympics.jpg";
import pdfExplora from "@/assets/proj-pdfexplora.jpg";

export type Category = "AI / ML" | "Healthcare AI" | "LLM Applications";

export interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  results: string[];
  stack: string[];
  categories: Category[];
  image: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: "neuroai-platform",
    title: "NeuroAI Platform",
    date: "Jun 2025 · Present",
    description:
      "Scalable ML platform with automated parameter prediction for EEG model benchmarking and intelligent ingestion workflows.",
    results: [
      "Reduced testing time from 2–3 days to minutes",
      "Tested by 5+ researchers in production",
    ],
    stack: ["Python", "PyTorch", "MNE", "ReactJS", "Docker", "AWS"],
    categories: ["AI / ML", "Healthcare AI"],
    image: neuroai,
  },
  {
    slug: "seizure-detection",
    title: "Real-time Seizure Detection & Classification",
    date: "May 2025 · Jul 2025",
    description:
      "GNN-based optimization system for seizure detection on the TUH EEG dataset with hyperparameter optimization.",
    results: [
      "90% detection · 87% classification",
      "84% early prediction on TUH EEG",
    ],
    stack: ["Python", "PyTorch Geometric", "GNNs"],
    categories: ["AI / ML", "Healthcare AI"],
    image: seizure,
  },
  {
    slug: "multimodal-rag-xray",
    title: "Multimodal RAG for Chest X-ray (MIMIC-CXR)",
    date: "2025",
    description:
      "Retrieval-Augmented Generation system for chest X-ray interpretation using CLIP cross-modal retrieval and Groq LLM.",
    results: [
      "FAISS similarity search over MIMIC-CXR",
      "Structured radiology findings & impressions",
    ],
    stack: ["Python", "CLIP", "Groq LLM", "FAISS", "Streamlit"],
    categories: ["LLM Applications", "Healthcare AI"],
    image: ragXray,
  },
  {
    slug: "sleep-snn",
    title: "Energy-Efficient Sleep Stage Classification",
    date: "Feb 2025 · Mar 2025",
    description:
      "Spiking Neural Networks on the ISRUC-Sleep dataset, optimized for low-power edge computing.",
    results: ["82% accuracy", "35% energy reduction"],
    stack: ["Python", "TensorFlow", "snnTorch", "MNE"],
    categories: ["AI / ML", "Healthcare AI"],
    image: sleep,
  },
  {
    slug: "multiview-decoding",
    title: "Multiview Neural Decoding with Attention",
    date: "Nov 2024 · Jan 2025",
    description:
      "Attention-based decoder combining temporal, spectral and spatial features across 500+ subjects.",
    results: ["93.3% accuracy", "+2.3% over prior work"],
    stack: ["Python", "PyTorch", "Attention"],
    categories: ["AI / ML"],
    image: multiview,
  },
  {
    slug: "dental-dicom",
    title: "AI-Powered Dental DICOM Annotation",
    date: "Jun 2025",
    description:
      "U-Net model for segmenting dental CT scans, including nerves, roots, and enamel structures.",
    results: ["3D volumetric preprocessing", "3D Slicer / Dragonfly visualization"],
    stack: ["Python", "PyTorch", "U-Net", "pydicom"],
    categories: ["Healthcare AI", "AI / ML"],
    image: dental,
  },
  {
    slug: "groqvision",
    title: "GroqVision: Vision-LLM OCR & Document Analysis",
    date: "Jul 2025",
    description:
      "Streamlit web app enabling OCR and document understanding from uploaded images via vision-enabled Groq LLM.",
    results: ["Auto-structured Markdown output", "Document Q&A"],
    stack: ["Python", "Streamlit", "Groq", "Pillow"],
    categories: ["LLM Applications"],
    image: groqvision,
  },
  {
    slug: "audio-analyzer",
    title: "Audio-Analyzer: Intelligent Audio Processing",
    date: "Aug 2024",
    description:
      "Full-stack secure app for audio diarization, transcription, feature extraction and chatbot querying.",
    results: ["JWT auth + responsive UI", "Groq LLM querying"],
    stack: ["Flask", "React", "JWT", "Librosa", "Groq"],
    categories: ["LLM Applications"],
    image: audio,
  },
  {
    slug: "edupath",
    title: "EduPath: AI Academic & Relocation Advisor",
    date: "Mar 2025",
    description:
      "Voice/chat assistant using LLMs and multi-criteria decision algorithms for academic recommendations.",
    results: ["Multi-criteria ranking", "Voice + chat interface"],
    stack: ["Python", "NLP", "LLMs", "Flask", "React"],
    categories: ["LLM Applications"],
    image: edupath,
  },
  {
    slug: "lahore-legacy",
    title: "LahoreLegacy: AI-Powered Historical Guide",
    date: "May 2025",
    description:
      "AI web app to explore Lahore's history using LLMs and FAISS semantic search over Wikipedia and PDFs.",
    results: ["FAISS vector retrieval", "PDF upload + summarization"],
    stack: ["Python", "Streamlit", "LangChain", "FAISS", "OpenAI"],
    categories: ["LLM Applications"],
    image: lahore,
  },
  {
    slug: "lawyer-assistant",
    title: "LawyerAssistant: Intelligent Legal Support",
    date: "Feb 2024",
    description:
      "Full-stack AI legal assistant for case research, document summarization and case law referencing.",
    results: ["VectorDB semantic querying", "LangChain LLM workflows"],
    stack: ["React", "Flask", "LangChain", "VectorDB"],
    categories: ["LLM Applications"],
    image: lawyer,
  },
  {
    slug: "madina-chatbot",
    title: "Madina Visiting Assistant Chatbot",
    date: "Jan 2024",
    description:
      "WhatsApp chatbot to guide visitors on religious sites, prayer timings and local etiquette.",
    results: ["Multilingual real-time messaging", "Webhook architecture"],
    stack: ["Twilio", "Flask", "Python", "LLMs"],
    categories: ["LLM Applications"],
    image: madina,
  },
  {
    slug: "crane-gpt",
    title: "CraneGPT: Industrial AI Chatbot",
    date: "Apr 2023",
    description:
      "AI chatbot for industrial crane operators, providing answers from operation manuals and troubleshooting guides.",
    results: ["75% faster task resolution", "Multi-language retrieval"],
    stack: ["LLaMA-2", "LangChain", "VectorDB", "React"],
    categories: ["LLM Applications"],
    image: crane,
  },
  {
    slug: "clinical-llm",
    title: "AI-Assisted Clinical Exam Preparation",
    date: "Jul 2024",
    description:
      "Fine-tuned Meditron LLM with LoRA/QLoRA to replicate USMLE-style clinical reasoning.",
    results: ["92%+ reasoning accuracy", "40% less manual annotation"],
    stack: ["Meditron", "LoRA", "QLoRA", "PEFT"],
    categories: ["LLM Applications", "Healthcare AI"],
    image: clinical,
  },
  {
    slug: "neurogenesis",
    title: "NeuroGenesis: Synthetic Brain Tumor Scans",
    date: "Mar 2022",
    description:
      "DCGAN to generate synthetic MRI scans for brain tumor analysis and data augmentation.",
    results: [">90% authenticity (radiologists)", "Improved generalization"],
    stack: ["PyTorch", "DCGAN"],
    categories: ["AI / ML", "Healthcare AI"],
    image: neurogenesis,
  },
  {
    slug: "breast-cancer",
    title: "Breast Cancer Detection System",
    date: "Aug 2021",
    description:
      "ANN classifying malignant vs benign tumors using structured tabular features.",
    results: ["99% on UCI dataset", "k-fold cross-validation"],
    stack: ["Python", "Keras", "Scikit-learn"],
    categories: ["AI / ML", "Healthcare AI"],
    image: breast,
  },
  {
    slug: "emotion-eeg",
    title: "Emotion Estimation through Brain Signals",
    date: "Aug 2025",
    description:
      "EEG emotion recognition pipeline with preprocessing, artifact removal and frequency-band features.",
    results: ["Interpretable outputs", "Streamlit dashboard"],
    stack: ["Python", "MNE", "Scikit-learn", "Streamlit"],
    categories: ["AI / ML", "Healthcare AI"],
    image: emotion,
  },
  {
    slug: "gnn-pdm",
    title: "GNN-PdM: Predictive Maintenance",
    date: "2024",
    description:
      "Graph neural network–based predictive maintenance system for industrial crane systems using sensor data and digital twins.",
    results: ["Sensor + digital-twin fusion", "Failure-mode early warning"],
    stack: ["Python", "PyTorch Geometric", "GNNs", "Digital Twins"],
    categories: ["AI / ML"],
    image: gnnPdm,
    github: "https://github.com/Noor-Fatima-Afzal/GNN-PdM",
  },
  {
    slug: "neurograph-tsc",
    title: "NeuroGraph-TSC: EEG Cognitive State Prediction",
    date: "2024",
    description:
      "Neuro-inspired graph-based temporal-spatial model combining GAT and LSTM for EEG cognitive state prediction.",
    results: ["GAT + LSTM hybrid architecture", "Temporal-spatial EEG modeling"],
    stack: ["Python", "PyTorch", "GAT", "LSTM"],
    categories: ["AI / ML", "Healthcare AI"],
    image: neurographTsc,
    github: "https://github.com/Noor-Fatima-Afzal/Neurograph-TSC",
  },
  {
    slug: "obe-rubrics",
    title: "OBE Rubrics Management System",
    date: "2024",
    description:
      "Streamlit + MySQL system for managing educational rubrics, CLOs, assessments, and student performance.",
    results: ["End-to-end CLO tracking", "Structured assessment workflows"],
    stack: ["Python", "Streamlit", "MySQL"],
    categories: ["AI / ML"],
    image: obeRubrics,
    github: "https://github.com/Noor-Fatima-Afzal/OBE-Rubrics-Management-System",
  },
  {
    slug: "olympics-data-analysis",
    title: "Olympics Data Analysis",
    date: "2023",
    description:
      "Data analysis dashboard for Olympic history with insights into medals, countries, athletes, and trends.",
    results: ["Interactive medal & country insights", "Trend analysis across decades"],
    stack: ["Python", "Pandas", "Streamlit", "Plotly"],
    categories: ["AI / ML"],
    image: olympics,
    github: "https://github.com/Noor-Fatima-Afzal/Olympics-Data-Analysis",
  },
  {
    slug: "pdfexplora",
    title: "PDFExplora: Smart Document Q&A",
    date: "2024",
    description:
      "AI-powered document Q&A system using LLMs and FAISS to answer questions from uploaded PDFs.",
    results: ["FAISS-backed retrieval", "Context-grounded LLM answers"],
    stack: ["Python", "LLMs", "FAISS", "LangChain"],
    categories: ["LLM Applications"],
    image: pdfExplora,
    github: "https://github.com/Noor-Fatima-Afzal/PDFExplora-Smart-Document-Q-A",
  },
];

export const categories: Category[] = [
  "AI / ML",
  "Healthcare AI",
  "LLM Applications",
];
