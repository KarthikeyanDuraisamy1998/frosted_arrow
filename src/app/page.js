import styles from './page.module.css'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene'), {
    ssr: false,
})

export default function Home() {
  return (
    <main className={styles.main}>
        <Scene />
    </main>
  )
}


// import styles from './page.module.css'
// import dynamic from 'next/dynamic'

// const Scene = dynamic(() => import('@/components/Scene'), {
//   ssr: false,
// })

// export default function Home() {
//   return (
//     <main
//       style={{
//         position: 'relative',
//         width: '100vw',
//         height: '100vh',
//         overflow: 'hidden',
//         background: '#000',
//       }}
//     >
//       <iframe
//         src="/background.html"
//         style={{
//           position: 'fixed',
//           inset: 0,
//           width: '100vw',
//           height: '100vh',
//           border: 0,
//           zIndex: 0,
//           pointerEvents: 'none',
//         }}
//       />

//       <div
//         style={{
//           position: 'relative',
//           zIndex: 2,
//           width: '100vw',
//           height: '100vh',
//         }}
//       >
//         <Scene />
//       </div>
//     </main>
//   )
// }