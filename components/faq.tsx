import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How does tree tokenization work?",
      answer:
        "Each tree is represented as a unique NFT (ERC-721) containing metadata like GPS coordinates, species, and planting date. When you purchase a Tree NFT, you also receive Timber Share Tokens (TST) that represent your claim on future timber revenue from the entire forest ecosystem.",
    },
    {
      question: "What happens if my tree dies?",
      answer:
        'Our "Mature or Dead" guarantee ensures you still receive returns. The entire forest is insured against natural disasters, disease, and other risks. If a tree dies, the insurance payout is distributed to TST holders using the same mechanism as timber sales.',
    },
    {
      question: "How are returns calculated and distributed?",
      answer:
        "Returns come from timber sales when trees reach maturity (typically 15-25 years depending on species). Proceeds are converted to USDC and used to buy back TST tokens from the market, which are then burned. This increases the value of remaining TST tokens for all holders.",
    },
    {
      question: "What blockchain technology do you use?",
      answer:
        "We built on Onino RWA blockchain for low transaction costs and impressive architecture. We use Chainlink oracles for reliable external data, IPFS/Arweave for metadata storage, and OpenZeppelin smart contracts for security and upgradeability.",
    },
    {
      question: "How do you verify tree health and growth?",
      answer:
        "We use a combination of satellite imagery, IoT sensors, and on-ground forestry partners. This data is fed into our smart contracts through Chainlink oracle networks, ensuring tamper-proof verification of tree status and growth metrics.",
    },
    {
      question: "Can I sell my Tree NFT before maturity?",
      answer:
        "Yes! Tree NFTs can be traded on secondary markets like OpenSea or our dedicated marketplace. This provides liquidity for what was traditionally a very illiquid 20+ year investment, allowing you to exit your position at any time.",
    },
    {
      question: "What are the risks involved?",
      answer:
        "Main risks include regulatory changes, smart contract vulnerabilities, oracle failures, and forestry management issues. We mitigate these through comprehensive insurance, audited contracts, multiple oracle sources, and partnerships with certified sustainable forestry organizations.",
    },
    {
      question: "How do you ensure sustainable forestry practices?",
      answer:
        "We only partner with FSC-certified (Forest Stewardship Council) forestry organizations that follow strict sustainable management practices. Our tokenization model actually incentivizes long-term forest health since thousands of token holders benefit from proper management.",
    },
  ]

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about tree tokenization and SylvanCap
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
