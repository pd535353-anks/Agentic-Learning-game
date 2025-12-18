import { LevelData } from './types';

export const LEVEL_TIME_LIMIT_SECONDS = 600; // 10 minutes
export const BONUS_TIME_THRESHOLD = 300; // 5 minutes

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "Monitoring AI Performance",
    description: "Assess AI agents and integrate human interventions efficiently.",
    tasks: [
      {
        id: "L1-T1",
        difficulty: "Easy",
        title: "Analyze Metrics",
        description: "Identify the underperforming metric in the dashboard.",
        type: "dashboard",
        hints: ["Look for the bar that is significantly lower than the target line.", "Accuracy seems stable, check the response times.", "Speed is the issue here."],
        content: {
          data: [
            { name: 'Accuracy', value: 95, target: 90 },
            { name: 'Speed', value: 45, target: 80 }, // Underperforming
            { name: 'Error Rate', value: 98, target: 95 }, // Inverted for chart (higher is better aka lower error)
          ],
          question: "Which metric is critical?",
          correctMetric: "Speed",
          options: ["Server Latency", "Model Hallucination", "Context Window Overflow"],
          correctReason: "Server Latency"
        }
      },
      {
        id: "L1-T2",
        difficulty: "Medium",
        title: "Client Request Failure",
        description: "An AI agent failed to process a complex client request. Choose the best action.",
        type: "choice",
        hints: ["Retrying blindly often leads to the same error.", "The client is waiting; speed matters.", "Human intervention ensures quality."],
        content: {
          scenario: "Agent reported: 'Unable to parse intent for VIP Client request #4092'.",
          options: [
            { id: 'retry', text: "Force the agent to retry immediately.", correct: false, feedback: "The agent will likely fail again without context changes." },
            { id: 'escalate', text: "Escalate to human operator.", correct: true, feedback: "Correct. For VIP failures, human intervention ensures immediate resolution." },
            { id: 'ignore', text: "Log error and ignore.", correct: false, feedback: "Ignoring a VIP client request is unacceptable." }
          ]
        }
      },
      {
        id: "L1-T3",
        difficulty: "Difficult",
        title: "Intervention Review",
        description: "Identify which log entry required human intervention to improve the outcome.",
        type: "sorting",
        hints: ["Look for high confidence scores; usually AI handles those well.", "Low confidence scores are a flag.", "Ambiguous queries need humans."],
        content: {
          items: [
            { id: '1', text: "User: 'Reset password' (Conf: 99%)", bucket: 'AI' },
            { id: '2', text: "User: 'I hate this product, it's garbage' (Conf: 60%)", bucket: 'Human' },
            { id: '3', text: "User: 'What is your refund policy?' (Conf: 95%)", bucket: 'AI' }
          ],
          buckets: ['AI', 'Human']
        }
      }
    ]
  },
  {
    id: 2,
    title: "Enabling Feedback Loops",
    description: "Collect and categorize feedback to refine AI performance.",
    tasks: [
      {
        id: "L2-T1",
        difficulty: "Easy",
        title: "Feedback Sorting",
        description: "Sort the feedback comments into the correct sentiment bins.",
        type: "sorting",
        hints: ["'Great job' is clearly positive.", "'Confused' implies a negative experience.", "Factual statements are often neutral."],
        content: {
          items: [
            { id: '1', text: "The answer was precise and helpful.", bucket: 'Positive' },
            { id: '2', text: "I don't understand what this means.", bucket: 'Negative' },
            { id: '3', text: "The response was generated in 2 seconds.", bucket: 'Neutral' }
          ],
          buckets: ['Positive', 'Negative', 'Neutral']
        }
      },
      {
        id: "L2-T2",
        difficulty: "Medium",
        title: "Prioritize Actions",
        description: "Select the most critical feedback to address immediately.",
        type: "choice",
        hints: ["Safety and bias issues take precedence over style.", "Look for 'offensive' or 'wrong' data.", "Tone is secondary to facts."],
        content: {
          scenario: "Feedback Inbox",
          options: [
            { id: '1', text: "User flagged output as 'Politically Biased'", correct: true, feedback: "Correct. Bias/Safety is a P0 issue." },
            { id: '2', text: "User said the greeting was too formal", correct: false, feedback: "Tone is important, but bias is critical." },
            { id: '3', text: "User noted a typo in the footer", correct: false, feedback: "Minor polish issue." }
          ]
        }
      },
      {
        id: "L2-T3",
        difficulty: "Difficult",
        title: "Strategic Improvement",
        description: "Based on the trend, select the best improvement action.",
        type: "dashboard",
        hints: ["Customer satisfaction is dropping on 'Technical' queries.", "The chart shows a dip in Q3 for complex math.", "More data usually helps domain gaps."],
        content: {
          data: [
            { name: 'Creative Writing', value: 90 },
            { name: 'General Chat', value: 85 },
            { name: 'Technical Support', value: 40 }, // Problem area
          ],
          question: "Technical Support scores are low. What is the best action?",
          options: ["Adjust Temperature (Creativity)", "Increase Training Data for Tech Docs", "Limit Response Length"],
          correctReason: "Increase Training Data for Tech Docs",
          correctMetric: "Technical Support" // Used for visual highlighting
        }
      }
    ]
  },
  {
    id: 3,
    title: "Reviewing & Validating",
    description: "Check AI outputs for accuracy, compliance, and tone.",
    tasks: [
      {
        id: "L3-T1",
        difficulty: "Easy",
        title: "Fact Check",
        description: "Highlight the factual error in the AI response.",
        type: "highlight",
        hints: ["Check the year.", "The Olympics location looks wrong.", "Paris is 2024."],
        content: {
          text: "The 2024 Summer Olympics were held in Mars, bringing together athletes from around the world.",
          correctIndices: [38, 39, 40, 41] // Indices for "Mars"
        }
      },
      {
        id: "L3-T2",
        difficulty: "Medium",
        title: "Compliance Scan",
        description: "The AI generated an email. Identify the compliance violation.",
        type: "choice",
        hints: ["PII (Personally Identifiable Information) must be protected.", "Look for credit card numbers.", "Social Security numbers are a red flag."],
        content: {
          scenario: "Email draft: 'Dear Customer, we have processed your refund to card 4444-5555-6666-7777.'",
          options: [
            { id: '1', text: "Tone is too casual", correct: false, feedback: "Tone is acceptable." },
            { id: '2', text: "Exposes full Credit Card number", correct: true, feedback: "Correct! PCI compliance requires masking PANs." },
            { id: '3', text: "Greeting is generic", correct: false, feedback: "Generic greetings are safe." }
          ]
        }
      },
      {
        id: "L3-T3",
        difficulty: "Difficult",
        title: "Version Comparison",
        description: "Compare two summaries. Which one is better?",
        type: "choice",
        hints: ["Conciseness is key for summaries.", "Avoid hallucinated details not in source.", "Version A looks too verbose."],
        content: {
          scenario: "Source: 'The market dipped 2% due to oil prices.'",
          options: [
            { id: 'A', text: "Version A: The stock market crashed heavily because oil tycoons conspired to raise prices by 50%.", correct: false, feedback: "Incorrect. Version A hallucinates details." },
            { id: 'B', text: "Version B: Market saw a 2% decline attributed to oil price fluctuations.", correct: true, feedback: "Correct. Accurate and grounded in source." }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Corrective Action Planning",
    description: "Collaborate to address AI exceptions and plan corrections.",
    tasks: [
      {
        id: "L4-T1",
        difficulty: "Easy",
        title: "Team Chat Response",
        description: "A team member reported an issue. Choose the best first response.",
        type: "chat",
        hints: ["Don't ignore it.", "Get the facts first.", "Don't blame immediately."],
        content: {
          messages: [
            { sender: 'DevOps', text: "Hey, the AI just hallucinated a refund policy. Clients are confusing it." }
          ],
          options: [
            { id: '1', text: "Turn off the AI immediately!", correct: false, feedback: "Too drastic without investigation." },
            { id: '2', text: "Can you send the specific logs/Conversation ID?", correct: true, feedback: "Correct. Information gathering is step 1." },
            { id: '3', text: "It's probably just a one-off.", correct: false, feedback: "Dismissive and risky." }
          ]
        }
      },
      {
        id: "L4-T2",
        difficulty: "Medium",
        title: "Planning Board",
        description: "Assign the corrective action to the correct phase.",
        type: "sorting",
        hints: ["Root cause comes first.", "Fixing code is execution.", "Monitoring happens after fix."],
        content: {
          items: [
            { id: '1', text: "Analyze Log Data", bucket: 'Investigation' },
            { id: '2', text: "Retrain Model", bucket: 'Execution' },
            { id: '3', text: "Verify Fix in Prod", bucket: 'Validation' }
          ],
          buckets: ['Investigation', 'Execution', 'Validation']
        }
      },
      {
        id: "L4-T3",
        difficulty: "Difficult",
        title: "Root Cause Report",
        description: "Select the correct Root Cause for a 'Hallucination' error.",
        type: "choice",
        hints: ["Hallucinations often come from training gaps.", "Latency is a speed issue.", "Permissions are security."],
        content: {
          scenario: "Issue: AI invented a product feature that doesn't exist.",
          options: [
            { id: '1', text: "Root Cause: Server Timeout", correct: false, feedback: "Timeouts cause errors, not hallucinations." },
            { id: '2', text: "Root Cause: Outdated/Missing Grounding Data", correct: true, feedback: "Correct. The AI didn't have the current product specs." },
            { id: '3', text: "Root Cause: User Typo", correct: false, feedback: "User typos shouldn't cause feature fabrication." }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Refining Prompts & Workflows",
    description: "Optimize prompts and templates for better performance.",
    tasks: [
      {
        id: "L5-T1",
        difficulty: "Easy",
        title: "Prompt Engineering",
        description: "Make the prompt 'Write an email' more specific.",
        type: "choice",
        hints: ["Who is the audience?", "What is the tone?", "What is the topic?"],
        content: {
          scenario: "Current Prompt: 'Write an email.'",
          options: [
            { id: '1', text: "Write a short email.", correct: false, feedback: "Still too vague." },
            { id: '2', text: "Write a professional email to a client apologizing for the delay.", correct: true, feedback: "Correct! Specifies Tone, Audience, and Topic." },
            { id: '3', text: "Write an email now.", correct: false, feedback: "Adds urgency, but not context." }
          ]
        }
      },
      {
        id: "L5-T2",
        difficulty: "Medium",
        title: "Workflow Optimization",
        description: "Identify the bottleneck step in this workflow.",
        type: "choice",
        hints: ["Where does the data stop?", "Manual approval is slow.", "Automated steps are fast."],
        content: {
          scenario: "User Input -> AI Draft -> Human Approval (24h SLA) -> Send",
          options: [
            { id: '1', text: "User Input", correct: false, feedback: "Input is instantaneous." },
            { id: '2', text: "Human Approval step", correct: true, feedback: "Correct. A 24h wait is a major bottleneck." },
            { id: '3', text: "Send step", correct: false, feedback: "Sending is instant." }
          ]
        }
      },
      {
        id: "L5-T3",
        difficulty: "Difficult",
        title: "Prompt Library",
        description: "Match the prompt technique to its definition.",
        type: "sorting",
        hints: ["Few-shot uses examples.", "Chain of thought explains reasoning.", "Zero-shot has no examples."],
        content: {
          items: [
            { id: '1', text: "Provide 3 examples of good output...", bucket: 'Few-Shot' },
            { id: '2', text: "Let's think step by step...", bucket: 'Chain of Thought' },
            { id: '3', text: "Just do the task.", bucket: 'Zero-Shot' }
          ],
          buckets: ['Few-Shot', 'Chain of Thought', 'Zero-Shot']
        }
      }
    ]
  }
];
