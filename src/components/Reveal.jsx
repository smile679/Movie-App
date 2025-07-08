import { motion } from "framer-motion"; 

const Reveal=({ children })=>{

  return <motion.div
  initial={{ opacity: 0, y: 75}}
  whileInView={{opacity: 1 , y:0,
    transition:{duration: 1}
  }}
  viewport={{
     once: true, amount: 0.2
  }}
  >
      { children }
  </motion.div>
}

export default Reveal;