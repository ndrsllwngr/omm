import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/context/authContext'
import { IoCreate, IoLogIn, IoPerson, IoReorderThree } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'

//https://tailwindcomponents.com/component/responsive-navbar-2
export const Navbar = () => {
  const toggleRef = useRef(null)
  const [isOpen, setIsOpen] = useDetectOutsideClick(toggleRef, false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    //https://codepen.io/codetimeio/pen/RYMqvL
    <header className="p-4 pb-0 bg-custom-gray shadow-lg border-b md:border-b-0 ">
      <div className="max-w-7xl mx-auto md:pb-4 md:flex md:items-center md:justify-between ">
        {/*Logo */}
        <div className="flex flex-shrink-0 items-center justify-between mb-4 md:mb-0">
          <Link href={'/'} className="cursor-pointer ">
            <a className={'h-8 mr-2'}>
              <svg
                height={'h-auto'}
                viewBox="0 0 1498 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M21.1931 267.996C18.0803 265.998 15.6346 263.445 13.8559 260.337C11.8548 257.229 10.2984 253.899 9.18671 250.347C7.85271 246.794 6.85217 243.132 6.18516 239.357C5.29581 235.361 4.40644 231.587 3.51709 228.035C3.51709 224.927 4.1841 222.707 5.51815 221.375C6.85217 219.821 8.29738 218.378 9.85375 217.046C15.1899 216.824 19.9702 216.38 24.1946 215.714C28.4191 215.048 32.5324 214.382 36.5344 213.716C40.5366 213.05 44.5387 212.495 48.5408 212.051C52.5429 211.384 56.8784 211.052 61.5476 211.052C64.8827 204.169 67.9955 197.62 70.8858 191.404C73.7763 184.966 76.5555 178.861 79.2233 173.089C80.5576 167.539 82.2255 162.432 84.2265 157.771C86.4494 152.887 88.5622 148.335 90.5631 144.117C92.5641 139.677 94.3423 135.348 95.8993 131.13C97.4555 126.69 98.4559 122.028 98.9007 117.144C101.568 109.374 103.903 102.269 105.904 95.8312C108.128 89.1709 109.795 81.2899 110.907 72.1875C102.458 73.5196 95.6765 74.8516 90.5631 76.1836C85.449 77.2936 81.7808 78.4038 79.5571 79.5136C75.1103 79.2919 71.5529 78.4038 68.8848 76.8496C66.4391 75.2956 64.438 73.4085 62.8816 71.1885C61.3253 68.9685 59.9913 66.4154 58.8796 63.5293C57.7679 60.6433 56.4338 57.6462 54.8774 54.5381C55.7668 52.54 55.9891 49.654 55.5445 45.8799C55.0998 41.8838 53.7657 38.9977 51.5423 37.2217C53.321 36.7777 54.6551 35.3346 55.5445 32.8926C56.4338 30.2285 56.545 28.2304 55.878 26.8984C59.6577 25.7884 63.6598 25.1224 67.8842 24.9004C72.1087 24.4564 76.222 24.1234 80.2238 23.9014C84.4485 23.4574 88.4504 23.0134 92.2303 22.5694C96.0102 21.9033 99.2344 20.6823 101.902 18.9063C113.464 18.4623 125.47 18.0183 137.921 17.5742C150.594 17.1302 162.267 16.5752 172.939 15.9092C176.942 17.2412 181.499 17.9072 186.614 17.9072C191.95 17.9072 197.174 18.2402 202.288 18.9063C207.624 19.5723 212.294 21.0153 216.296 23.2353C220.52 25.4554 223.411 29.3405 224.967 34.8906C228.302 35.3346 230.748 36.2227 232.304 37.5547C234.083 38.8867 235.195 40.5518 235.639 42.5498C236.084 44.3259 236.195 46.4349 235.972 48.877C235.972 51.097 235.972 53.317 235.972 55.5371C232.415 58.2012 227.858 60.4212 222.299 62.1973C216.962 63.7513 211.071 65.0833 204.623 66.1933C198.175 67.0814 191.394 67.7474 184.279 68.1914C177.387 68.4134 170.605 68.6354 163.935 68.8574C162.823 76.1836 160.822 84.8417 157.932 94.8322C155.264 104.6 152.484 114.258 149.594 123.804C146.703 133.128 144.146 141.564 141.924 149.112C139.922 156.439 139.033 161.212 139.255 163.431C137.031 168.538 135.142 172.867 133.585 176.419C132.252 179.971 130.918 183.301 129.583 186.409C128.472 189.517 127.249 192.626 125.915 195.733C124.803 198.619 123.358 201.95 121.579 205.724H144.257C144.702 208.166 145.703 209.831 147.26 210.719C148.816 211.607 150.483 212.383 152.262 213.05C154.041 213.716 155.597 214.604 156.931 215.714C158.488 216.602 159.265 218.156 159.265 220.376C163.49 221.486 166.159 223.151 167.27 225.371C168.381 227.591 168.604 230.033 167.937 232.697C167.492 235.139 166.381 237.693 164.602 240.356C163.045 243.021 161.489 245.352 159.933 247.35C157.932 246.906 156.042 247.461 154.263 249.015C152.484 250.347 150.817 251.901 149.261 253.677C142.812 252.789 136.476 252.678 130.25 253.344C124.025 254.009 118.244 254.565 112.908 255.008C111.796 255.231 111.352 255.897 111.574 257.007C111.796 257.895 111.574 258.561 110.907 259.005C104.014 256.785 96.8997 255.897 89.5626 256.341C82.4475 256.785 75.1103 257.895 67.5507 259.671C60.2136 261.225 52.654 262.89 44.8722 264.666C37.0903 266.664 29.1973 267.774 21.1931 267.996ZM388.213 103.823C382.654 103.823 376.651 104.267 370.203 105.155C363.756 105.821 357.419 106.598 351.193 107.486C346.747 108.152 342.411 108.707 338.186 109.151C334.184 109.595 330.516 109.928 327.18 110.15C325.624 115.034 324.068 119.363 322.512 123.138C320.956 126.912 319.288 130.575 317.509 134.127C315.73 137.901 314.062 141.786 312.506 145.782C311.172 149.557 309.838 153.663 308.504 158.103C306.281 161.656 304.391 164.986 302.834 168.094C301.5 170.98 300.389 174.31 299.499 178.084C296.831 181.414 294.831 184.966 293.496 188.741C292.162 192.292 291.162 195.4 290.495 198.065L289.161 202.06C287.826 203.393 287.049 204.502 286.826 205.391C286.604 206.056 286.048 206.723 285.159 207.389C284.936 209.831 284.158 212.273 282.824 214.715C282.379 215.825 282.046 216.935 281.824 218.045C281.601 218.933 281.49 219.599 281.49 220.043C281.49 222.263 280.934 223.706 279.823 224.372C280.045 225.482 280.045 226.703 279.823 228.035C279.6 229.145 279.378 230.255 279.155 231.366C278.488 234.029 278.266 236.138 278.488 237.693C279.155 238.581 279.712 239.357 280.156 240.023C280.823 240.69 281.268 241.578 281.49 242.688C282.824 243.576 283.825 244.131 284.491 244.352C285.381 245.019 286.715 245.795 288.494 246.683L291.495 250.014C292.607 256.452 291.606 261.558 288.494 265.332C285.159 269.55 279.489 271.659 271.485 271.659H267.482C266.371 270.55 265.704 269.661 265.481 268.995C263.703 268.329 262.258 267.774 261.146 267.33C260.034 266.886 259.034 265.998 258.144 264.666C255.254 263.334 252.919 262.224 251.141 261.336L248.139 259.671C248.139 257.229 248.139 255.897 248.139 255.675C246.583 253.677 245.36 251.457 244.471 249.015C243.803 246.573 243.247 244.131 242.803 241.689C242.359 239.691 241.802 237.803 241.135 236.027C240.691 234.252 240.024 232.697 239.134 231.366C238.69 218.489 239.912 207.611 242.803 198.73C245.693 189.85 248.695 181.303 251.808 173.089C253.587 168.649 255.365 164.209 257.144 159.769C258.923 155.106 260.479 150.333 261.813 145.449L264.815 142.119C266.371 138.567 267.594 135.681 268.483 133.461C269.595 131.019 270.707 128.577 271.818 126.134C272.485 124.581 273.041 123.138 273.486 121.805C274.153 120.251 274.708 118.919 275.153 117.809C273.819 117.809 272.596 117.92 271.485 118.143C270.373 118.143 269.261 118.254 268.15 118.476C266.816 118.698 265.592 118.919 264.481 119.142C263.369 119.142 262.258 119.142 261.146 119.142C259.59 119.142 258.478 119.031 257.811 118.808C255.365 119.919 252.697 120.474 249.807 120.474H246.472C245.805 120.474 245.137 120.474 244.471 120.474C244.026 120.251 243.581 120.141 243.136 120.141C240.913 120.141 239.134 120.474 237.8 121.14C235.133 121.14 232.575 121.14 230.129 121.14H226.794C226.35 121.14 225.794 121.25 225.127 121.473C224.46 121.473 223.904 121.473 223.46 121.473C221.903 121.473 220.236 121.362 218.457 121.14C216.678 120.696 214.788 119.919 212.787 118.808C210.119 115.257 208.34 113.369 207.451 113.148L204.449 109.151C204.227 107.82 203.893 106.598 203.449 105.488C203.004 104.156 202.559 102.713 202.115 101.159C201.226 98.939 200.336 96.6078 199.447 94.1657C198.78 91.5021 198.446 88.3935 198.446 84.8417C198.668 83.0654 199.113 81.734 199.781 80.8458C200.447 79.9577 201.003 79.1803 201.448 78.5146L202.448 73.5196L206.784 73.8525H216.122C223.237 73.8525 230.463 73.6306 237.8 73.1866C245.137 72.5205 252.697 71.8545 260.479 71.1885C264.926 70.7445 269.372 70.3005 273.819 69.8565C278.488 69.4125 283.269 68.9685 288.16 68.5244C289.05 66.5264 289.939 64.6393 290.828 62.8633L294.163 61.1982C298.166 60.9763 300.944 61.5313 302.501 62.8633C304.28 63.9733 305.725 65.0833 306.836 66.1933C311.728 65.7493 316.62 65.3054 321.511 64.8614C326.625 64.1953 331.739 63.4183 336.852 62.5303C344.412 61.4203 351.971 60.4212 359.531 59.5332C367.313 58.6452 374.761 58.2012 381.876 58.2012C384.989 58.2012 387.991 58.3122 390.881 58.5342C393.771 58.7562 396.439 59.0892 398.885 59.5332L402.22 61.8643C402.887 63.1963 403.776 64.4174 404.889 65.5273C406.222 66.6373 407.556 67.7474 408.89 68.8574C411.558 71.2995 414.227 74.1855 416.894 77.5156C419.563 80.8458 420.563 85.7299 419.896 92.1678C418.117 94.8322 416.783 96.3861 415.894 96.8302L412.892 100.826L409.557 100.493C408.223 100.493 407 100.715 405.889 101.159C404.777 101.381 403.665 101.714 402.554 102.158C401.664 102.602 400.775 103.046 399.885 103.491C398.996 103.712 397.995 103.935 396.884 104.156C394.883 104.156 393.215 104.156 391.882 104.156C390.769 103.935 389.547 103.823 388.213 103.823ZM467.748 61.8643C467.526 62.9743 466.969 63.6403 466.081 63.8623C465.413 63.8623 464.857 64.4174 464.413 65.5273C463.523 67.9694 462.967 69.5234 462.745 70.1895C462.523 70.6335 462.301 70.9665 462.078 71.1885C461.856 71.1885 461.522 71.4105 461.077 71.8545C460.856 72.2985 460.3 73.6306 459.41 75.8506C457.854 78.9587 455.853 82.178 453.407 85.5082C451.184 88.616 449.738 91.7237 449.072 94.8322C445.959 97.4959 442.068 100.937 437.398 105.155C432.952 109.151 428.728 111.926 424.725 113.48C422.724 112.592 419.501 111.261 415.053 109.484C410.829 107.486 406.716 105.266 402.714 102.824C398.934 100.16 396.043 97.4959 394.042 94.8322C392.041 91.9461 392.263 89.1709 394.709 86.5072C398.712 82.2889 402.158 77.2936 405.048 71.5215C408.161 65.5273 410.829 59.2002 413.052 52.54C415.498 45.6579 417.499 38.6647 419.056 31.5605C420.834 24.2344 422.391 17.2412 423.724 10.581C424.614 11.469 425.503 11.8021 426.393 11.5801C427.504 11.1361 428.394 10.581 429.061 9.91501C429.95 9.02702 430.729 8.02799 431.395 6.91797C432.285 5.80794 432.952 4.91992 433.396 4.25391C434.731 5.36393 436.954 6.69596 440.067 8.25C443.402 9.80403 446.848 11.3581 450.405 12.9121C453.963 14.2442 457.298 15.4652 460.411 16.5752C463.523 17.6852 465.747 18.3513 467.081 18.5732C469.749 22.7913 471.194 26.6764 471.417 30.2285C471.639 33.5586 472.194 37.1107 473.084 40.8848C471.75 41.9948 470.972 43.8819 470.749 46.5459C470.527 48.988 470.305 50.764 470.083 51.8741C469.86 53.65 469.415 54.7601 468.748 55.2041C468.304 55.4261 467.859 56.3141 467.414 57.8681C467.192 58.3122 467.192 58.9782 467.414 59.8662C467.859 60.7542 467.971 61.4203 467.748 61.8643ZM449.232 114.147C450.788 109.484 453.234 105.488 456.569 102.158C460.126 98.8281 463.906 96.0529 467.908 93.8333C472.132 91.3912 476.468 89.3933 480.915 87.8386C485.361 86.2848 489.586 84.9525 493.588 83.8427C502.482 80.0685 511.931 76.5166 521.937 73.1866C532.164 69.6344 542.503 66.5264 552.953 63.8623C563.625 61.1982 574.52 59.5332 585.637 58.8672C596.754 57.9792 608.426 59.3112 620.655 62.8633C621.322 65.0833 622.323 67.1924 623.656 69.1904C624.99 71.1885 626.325 73.1866 627.659 75.1846C629.215 77.1826 630.549 79.1803 631.661 81.1791C632.772 82.9546 633.44 84.8417 633.662 86.8397C635.886 88.8376 637.664 91.058 638.998 93.5C640.332 95.7204 640.554 98.7173 639.665 102.492C637.442 104.267 635.218 105.933 632.995 107.486C630.993 108.819 628.77 110.039 626.325 111.149C618.098 109.151 609.761 108.485 601.311 109.151C592.863 109.818 585.303 110.373 578.633 110.817C576.632 108.819 574.186 107.82 571.295 107.82C568.628 107.82 565.737 108.263 562.625 109.151C559.734 110.039 556.732 110.927 553.62 111.816C550.729 112.704 547.95 112.925 545.282 112.481C543.058 114.258 540.279 115.478 536.945 116.145C533.831 116.589 530.385 117.033 526.605 117.477C526.383 118.587 526.605 119.363 527.273 119.807C527.939 120.03 528.051 120.696 527.606 121.805C528.94 123.36 530.608 124.47 532.609 125.136C534.832 125.802 537.056 126.468 539.279 127.133C541.724 127.8 543.837 128.688 545.615 129.798C547.394 130.686 548.617 132.24 549.284 134.46C552.619 134.46 555.51 135.237 557.955 136.791C560.401 138.345 562.402 140.232 563.958 142.452C565.515 144.672 566.627 147.115 567.293 149.778C568.183 152.22 568.628 154.441 568.628 156.439C569.294 158.215 570.073 158.991 570.962 158.77C571.852 158.547 572.852 158.991 573.964 160.102C574.631 162.987 576.299 165.985 578.966 169.093C581.635 171.979 583.747 175.198 585.303 178.75C585.748 184.3 586.081 189.295 586.303 193.735C586.526 197.954 585.748 202.283 583.969 206.723C580.634 214.937 575.965 222.263 569.962 228.701C564.181 235.139 557.511 240.911 549.951 246.018C542.614 250.902 534.721 255.12 526.272 258.672C517.823 262.224 509.596 265.221 501.593 267.663C500.703 267.441 499.814 267.441 498.924 267.663C498.035 267.885 497.813 267.33 498.257 265.998C496.478 267.552 494.477 268.551 492.254 268.995C490.253 269.439 488.03 269.55 485.584 269.328C483.138 269.328 480.581 269.217 477.913 268.995C475.468 268.773 473.133 268.884 470.909 269.328C469.353 267.774 467.908 266.22 466.574 264.666C465.462 263.334 464.573 261.558 463.906 259.338C462.794 259.338 462.239 258.783 462.239 257.673C462.461 256.563 462.127 256.008 461.238 256.008C462.572 253.788 463.127 252.566 462.905 252.345C462.905 251.901 462.572 251.567 461.905 251.346C461.46 251.123 461.015 250.902 460.571 250.679C460.126 250.236 460.015 249.68 460.237 249.015C461.126 247.238 461.46 245.24 461.238 243.021C461.015 240.579 460.793 238.137 460.571 235.695C460.349 233.253 460.46 230.921 460.904 228.701C461.571 226.481 463.239 224.705 465.907 223.373C473.467 224.261 480.581 224.039 487.251 222.707C494.144 221.153 500.592 219.044 506.595 216.38C512.598 213.716 518.268 210.83 523.604 207.722C529.163 204.613 534.61 201.839 539.946 199.397C540.613 197.398 541.502 195.733 542.614 194.401C543.948 193.07 545.282 191.848 546.616 190.738C547.95 189.628 549.173 188.407 550.285 187.075C551.396 185.743 552.175 184.078 552.619 182.08C552.841 180.526 552.397 179.638 551.285 179.416C550.396 178.972 549.951 178.084 549.951 176.752L546.283 175.753C542.058 173.311 537.278 171.313 531.941 169.758C526.605 167.983 522.048 166.096 518.268 164.098C515.822 165.429 513.487 165.763 511.264 165.097C509.263 164.43 506.595 163.765 503.26 163.099C495.701 162.655 488.363 161.877 481.248 160.768C474.356 159.658 467.686 157.659 461.238 154.773C460.793 153.663 460.237 152.664 459.57 151.776C458.903 150.888 457.68 150.666 455.902 151.11C454.568 149.334 453.234 147.669 451.899 146.116C450.566 144.339 449.343 142.452 448.231 140.454C448.676 137.79 449.009 135.57 449.232 133.794C449.454 131.796 448.787 129.909 447.231 128.133C448.12 125.247 448.787 122.916 449.232 121.14C449.676 119.363 449.676 117.033 449.232 114.147ZM789.066 252.678C787.731 260.226 783.951 265.443 777.726 268.329C774.834 268.551 772.61 268.44 771.054 267.996C769.72 267.552 768.275 266.997 766.718 266.331C764.717 265.443 762.938 264.888 761.382 264.666L757.714 262.002C757.269 260.892 756.714 259.782 756.046 258.672C755.379 257.562 754.601 256.452 753.711 255.342C751.933 253.122 750.154 250.347 748.375 247.017C747.042 240.579 746.819 235.251 747.709 231.032C748.598 226.592 749.709 222.263 751.044 218.045C751.488 216.713 751.933 215.381 752.378 214.049C752.822 212.495 753.267 211.052 753.711 209.72C747.931 206.612 743.595 202.171 740.705 196.399C737.815 190.628 736.147 185.077 735.702 179.749C736.369 175.531 737.592 172.2 739.371 169.758C741.149 167.095 743.151 164.986 745.374 163.431C747.819 161.877 750.265 160.657 752.711 159.769C755.379 158.881 757.936 158.103 760.382 157.438L764.717 159.102C766.718 161.101 768.719 162.655 770.72 163.765C772.277 163.099 773.278 162.1 773.723 160.768C774.389 159.214 774.945 157.548 775.39 155.773C776.056 153.774 776.725 151.776 777.392 149.778C778.277 147.78 779.278 145.782 780.396 143.784C780.171 140.898 780.613 138.234 781.723 135.792C780.171 134.682 778.502 134.016 776.725 133.794C776.282 133.794 775.168 133.572 773.389 133.128C770.72 131.13 768.83 129.465 767.719 128.133C766.829 126.579 765.941 125.136 765.051 123.804C763.717 120.918 762.05 118.587 760.048 116.81L756.714 114.479L758.381 111.149C758.826 110.706 759.048 110.15 759.048 109.484C759.048 108.819 758.603 107.82 757.714 106.487C757.269 104.045 757.269 102.38 757.714 101.492L758.381 98.1624C760.16 95.7204 761.048 94.3882 761.048 94.1657L764.051 91.1688C768.497 90.059 772.833 88.8376 777.058 87.5061C781.506 85.9515 785.953 84.3976 790.401 82.8438C794.623 81.5115 798.845 80.1793 803.068 78.8479C807.515 77.2936 811.963 75.9616 816.41 74.8516C817.97 73.7415 819.639 73.0755 821.416 72.8535C823.194 72.4095 824.862 72.0765 826.415 71.8545C827.75 71.6325 828.976 71.5215 830.086 71.5215C831.196 71.2995 831.972 70.8554 832.422 70.1895C835.085 69.3014 838.197 68.3024 841.76 67.1924C847.317 65.6384 854.652 63.9733 863.772 62.1973C872.884 60.1992 883.114 58.6452 894.453 57.5352L900.12 57.2022C901.237 57.4241 902.347 57.5352 903.457 57.5352C904.567 57.3132 905.677 57.2022 906.795 57.2022C916.799 57.2022 923.133 60.1992 925.803 66.1933C927.805 67.3034 929.583 68.5244 931.135 69.8565C932.695 71.1884 934.139 72.5205 935.474 73.8525C936.141 74.7406 936.809 75.5176 937.476 76.1836C938.361 76.8496 939.029 77.2936 939.479 77.5156C943.259 83.2878 944.477 88.3935 943.142 92.8343C941.14 95.7204 938.586 97.3851 935.474 97.8292L931.803 99.8271C929.358 99.6055 927.472 99.4939 926.137 99.4939C925.027 99.4939 923.8 99.4939 922.465 99.4939C916.908 99.4939 910.458 99.8271 903.123 100.493C895.789 101.159 888.229 102.158 880.444 103.491C872.884 104.6 865.549 106.043 858.432 107.82C851.322 109.595 845.089 111.482 839.757 113.48L833.757 116.477C832.197 118.919 831.305 120.918 831.087 122.472C830.862 123.804 830.637 125.136 830.42 126.468C830.195 127.356 829.977 128.244 829.752 129.132C829.752 130.02 829.644 131.019 829.419 132.129C825.639 136.791 823.745 142.341 823.745 148.779C822.192 151.444 821.191 153.442 820.749 154.773C820.299 155.884 820.299 157.327 820.749 159.102C824.971 160.879 828.976 161.544 832.756 161.101C836.536 160.657 840.316 160.102 844.096 159.435C849.203 158.547 854.434 157.771 859.767 157.104C865.324 156.439 870.998 156.105 876.78 156.105H887.453L884.783 158.77L886.451 163.431C887.778 164.098 888.671 164.542 889.114 164.764C889.781 164.986 890.448 165.318 891.116 165.763L892.785 168.759C893.677 169.204 894.453 169.981 895.121 171.091C896.006 172.2 896.565 173.866 896.79 176.086L883.114 195.4L878.441 196.732C874.661 196.511 871.332 196.955 868.436 198.065C866.884 198.509 865.324 198.953 863.772 199.397C862.212 199.618 860.543 199.729 858.765 199.729C854.318 200.617 850.538 201.284 847.426 201.727C844.538 202.171 841.535 202.615 838.422 203.059C834.417 203.504 830.529 204.169 826.749 205.057C822.969 205.724 819.414 206.723 816.076 208.054C813.856 208.054 812.296 208.054 811.412 208.054C809.626 208.054 807.74 208.388 805.738 209.054C803.96 209.497 802.292 209.941 800.739 210.386C799.622 211.274 798.845 212.273 798.403 213.383C797.961 214.271 797.51 215.27 797.068 216.38C796.175 219.488 794.957 222.041 793.397 224.039V229.034C791.619 231.254 790.509 233.03 790.067 234.362C789.842 235.472 789.508 236.582 789.066 237.693C788.616 238.358 788.282 239.024 788.064 239.691C787.839 240.135 787.731 240.69 787.731 241.355C789.508 244.685 789.951 248.46 789.066 252.678ZM975.322 240.69C976.432 247.35 975.99 252.566 973.987 256.341C972.21 260.115 969.54 262.89 965.985 264.666C962.647 266.664 958.759 267.774 954.311 267.996C949.864 268.218 945.642 267.996 941.637 267.33C939.417 264.222 937.414 260.337 935.637 255.675C933.852 251.013 932.191 246.239 930.631 241.355C929.078 236.25 927.627 231.254 926.292 226.37C925.182 221.486 924.181 217.157 923.296 213.383C924.406 210.719 925.073 207.722 925.298 204.392C925.741 200.84 925.966 197.287 925.966 193.735C926.183 190.184 926.292 186.631 926.292 183.079C926.517 179.305 926.851 175.753 927.293 172.423C928.853 163.099 931.073 154.218 933.968 145.782C937.081 137.346 939.525 128.577 941.303 119.475C941.745 117.477 941.528 115.59 940.635 113.814C939.968 112.037 939.859 110.373 940.302 108.819C940.527 107.931 941.194 107.376 942.304 107.153C943.414 106.709 944.082 105.933 944.307 104.822C944.974 102.38 945.083 100.382 944.64 98.8281C944.415 97.2743 944.858 95.3871 945.975 93.1668C947.085 91.3912 948.42 88.8376 949.973 85.5082C951.75 81.9556 952.418 78.293 951.975 74.5186C953.978 73.1866 955.864 71.6325 957.649 69.8565C959.426 68.0804 961.204 66.5264 962.981 65.1944C964.984 63.6403 967.095 62.3083 969.315 61.1982C971.767 60.0882 974.655 59.5332 977.992 59.5332C979.77 61.7533 980.88 64.1953 981.322 66.8594C981.989 69.5234 982.548 72.1875 982.991 74.8516C983.658 77.5156 984.551 80.0685 985.661 82.5105C986.771 84.7309 988.665 86.5072 991.327 87.8386C991.327 89.6149 991.327 91.8353 991.327 94.499C991.327 97.1634 991.443 99.8271 991.661 102.492C991.886 104.934 992.328 107.264 992.995 109.484C993.888 111.482 995.223 112.815 997 113.48C992.995 124.137 989.216 134.682 985.661 145.117C982.323 155.55 979.545 166.096 977.325 176.752C975.097 187.186 973.653 197.731 972.986 208.388C972.544 219.044 973.32 229.811 975.322 240.69ZM1089.21 203.393C1087.21 203.837 1085.76 205.057 1084.87 207.055C1083.99 208.832 1083.09 210.719 1082.21 212.717C1081.54 214.715 1080.76 216.602 1079.87 218.378C1079.2 219.932 1078.09 220.709 1076.53 220.709C1076.31 222.485 1075.64 224.039 1074.53 225.371C1073.65 226.703 1072.75 228.146 1071.87 229.7C1070.98 231.032 1070.31 232.586 1069.87 234.362C1069.42 235.916 1069.64 237.803 1070.53 240.023C1068.75 241.355 1067.64 243.242 1067.2 245.684C1066.75 248.126 1066.2 250.458 1065.53 252.678C1065.09 254.898 1064.19 256.785 1062.86 258.339C1061.52 259.893 1059.08 260.559 1055.52 260.337C1054.86 261.225 1054.75 261.78 1055.19 262.002C1055.63 262.224 1055.97 263.001 1056.19 264.333C1053.75 263.889 1051.85 264 1050.53 264.666C1049.41 265.554 1047.96 266.109 1046.19 266.331C1041.96 264.999 1038.4 262.668 1035.51 259.338C1032.84 256.008 1030.4 252.345 1028.18 248.349C1026.18 244.131 1024.28 239.912 1022.51 235.695C1020.95 231.476 1019.39 227.813 1017.84 224.705C1018.51 222.263 1018.62 219.932 1018.17 217.712C1017.72 215.27 1016.95 213.272 1015.84 211.718C1026.73 188.629 1038.63 163.987 1051.52 137.79C1064.42 111.593 1076.64 85.7299 1088.21 60.1992C1093.32 62.1973 1098.32 64.5283 1103.22 67.1924C1108.33 69.6344 1112.89 72.5205 1116.89 75.8506C1121.12 79.1803 1124.67 83.0654 1127.56 87.5061C1130.45 91.7237 1132.34 96.4969 1133.23 101.825C1132.78 103.157 1132.23 103.712 1131.56 103.491C1131.12 103.046 1130.67 103.157 1130.23 103.823C1131.12 104.934 1131.56 105.71 1131.56 106.154C1131.79 106.598 1131.79 107.042 1131.56 107.486C1131.56 107.931 1131.56 108.596 1131.56 109.484C1131.56 110.15 1131.9 111.149 1132.57 112.481C1131.67 112.26 1131.01 112.37 1130.56 112.815C1130.34 113.259 1129.67 113.259 1128.56 112.815C1129.45 115.257 1129.67 117.255 1129.23 118.808C1129 120.362 1128.56 121.805 1127.89 123.138C1127.23 124.247 1126.67 125.58 1126.22 127.133C1125.78 128.466 1125.89 130.242 1126.56 132.462C1125.89 132.462 1125.34 132.684 1124.9 133.128C1124.67 133.35 1124.45 133.683 1124.23 134.127C1124 134.349 1123.67 134.682 1123.23 135.126C1123 135.348 1122.56 135.348 1121.89 135.126C1122.56 140.01 1122.78 144.894 1122.56 149.778C1122.34 154.662 1122.11 159.658 1121.89 164.764C1121.89 169.648 1122 174.865 1122.23 180.415C1122.44 185.743 1123.23 191.293 1124.56 197.066C1132.57 192.403 1138.9 186.409 1143.57 179.083C1148.46 171.757 1152.35 163.543 1155.25 154.441C1158.36 145.338 1160.69 135.57 1162.25 125.136C1163.81 114.702 1165.47 104.045 1167.25 93.1668C1169.25 91.1688 1170.81 88.7268 1171.92 85.8407C1173.03 82.9546 1174.03 79.9577 1174.92 76.8496C1175.81 73.5196 1176.7 70.3005 1177.59 67.1924C1178.48 63.8623 1179.59 60.8652 1180.92 58.2012C1184.26 58.6452 1187.04 59.7552 1189.26 61.5313C1191.71 63.0853 1193.93 64.8614 1195.93 66.8594C1197.93 68.6354 1200.05 70.4114 1202.27 72.1875C1204.49 73.7415 1207.27 74.7406 1210.61 75.1846C1213.27 78.9587 1215.72 82.6221 1217.94 86.1739C1220.16 89.7258 1221.61 93.5 1222.27 97.4959C1221.16 99.2722 1220.28 101.27 1219.61 103.491C1219.16 105.71 1218.61 107.931 1217.94 110.15C1217.28 112.37 1216.38 114.479 1215.27 116.477C1214.16 118.254 1212.6 119.807 1210.61 121.14C1209.94 126.912 1209.05 132.24 1207.94 137.124C1207.05 141.786 1206.05 146.448 1204.94 151.11C1204.04 155.773 1203.27 160.657 1202.6 165.763C1201.93 170.647 1201.71 176.086 1201.93 182.08C1200.15 187.186 1198.27 192.626 1196.27 198.398C1194.26 204.169 1192.71 209.387 1191.59 214.049C1188.04 216.935 1185.26 220.376 1183.26 224.372C1181.25 228.368 1179.14 232.365 1176.92 236.36C1176.03 237.249 1175.47 237.47 1175.25 237.026C1175.03 236.582 1174.25 236.25 1172.92 236.027C1173.14 236.915 1173.14 237.581 1172.92 238.025C1172.69 238.469 1172.36 238.913 1171.92 239.357C1171.69 239.58 1171.47 240.023 1171.25 240.69C1171.25 241.355 1171.47 242.243 1171.92 243.353C1168.8 244.685 1166.03 246.573 1163.58 249.015C1161.14 251.457 1158.47 253.677 1155.58 255.675C1152.91 257.673 1149.57 259.005 1145.57 259.671C1141.79 260.337 1136.79 259.56 1130.56 257.34C1121.45 250.679 1113.33 243.021 1106.21 234.362C1099.32 225.704 1093.66 215.381 1089.21 203.393ZM1406.54 76.5166C1406.75 78.0705 1406.75 79.2919 1406.54 80.1793C1406.54 80.8458 1406.42 81.5115 1406.2 82.178C1406.2 82.8437 1406.2 83.6211 1406.2 84.5085C1406.2 85.175 1406.42 86.2848 1406.87 87.8386C1402.2 95.3871 1396.75 100.604 1390.52 103.491C1384.52 106.154 1377.97 108.152 1370.85 109.484C1363.73 110.594 1356.4 111.816 1348.84 113.148C1341.5 114.479 1334.17 117.365 1326.82 121.805C1323.94 120.696 1321.27 120.696 1318.82 121.805C1316.6 122.916 1313.26 123.248 1308.82 122.804C1307.48 124.137 1305.81 125.136 1303.81 125.802C1301.82 126.246 1299.81 126.801 1297.81 127.467C1298.7 129.465 1299.04 131.574 1298.81 133.794C1298.81 135.792 1299.15 137.457 1299.81 138.789C1307.59 139.455 1316.15 139.344 1325.49 138.456C1335.05 137.568 1344.39 137.013 1353.51 136.791C1353.73 137.901 1353.62 138.678 1353.18 139.122C1352.73 139.344 1352.62 139.899 1352.84 140.787C1354.39 141.897 1355.95 143.34 1357.51 145.117C1359.07 146.67 1360.62 148.224 1362.18 149.778C1363.73 151.332 1365.29 152.664 1366.84 153.774C1368.63 154.662 1370.62 154.995 1372.85 154.773C1373.74 156.549 1374.29 158.547 1374.52 160.768C1374.96 162.766 1374.74 164.874 1373.85 167.095C1370.3 169.537 1366.73 172.09 1363.18 174.754C1359.63 177.196 1355.85 179.416 1351.84 181.414C1348.06 183.412 1343.95 185.077 1339.5 186.409C1335.28 187.519 1330.5 187.963 1325.16 187.742C1324.05 187.742 1323.16 187.742 1322.49 187.742C1322.04 187.742 1321.38 187.408 1320.49 186.742C1318.71 187.852 1316.15 188.185 1312.82 187.742C1309.71 187.297 1307.26 187.63 1305.48 188.741C1303.03 187.63 1300.03 187.186 1296.48 187.408C1293.14 187.408 1290.14 186.964 1287.47 186.076C1283.92 190.738 1280.69 195.733 1277.8 201.061C1274.91 206.39 1272.35 212.051 1270.13 218.045C1277.69 219.155 1283.92 219.599 1288.81 219.377C1293.92 219.155 1298.7 218.822 1303.14 218.378C1307.59 217.712 1312.15 217.157 1316.82 216.713C1321.49 216.047 1327.38 215.825 1334.5 216.047C1338.94 213.605 1344.17 212.051 1350.17 211.384C1356.4 210.497 1362.07 209.165 1367.18 207.389C1368.96 208.054 1370.51 209.276 1371.85 211.052C1373.18 212.606 1374.4 214.16 1375.52 215.714C1376.86 217.046 1378.18 218.267 1379.52 219.377C1380.85 220.487 1382.52 220.931 1384.52 220.709C1385.41 221.597 1385.97 222.707 1386.19 224.039C1386.64 225.149 1386.97 226.259 1387.19 227.369C1387.41 228.479 1387.75 229.478 1388.19 230.367C1388.86 231.032 1389.86 231.254 1391.19 231.032C1387.86 238.358 1383.97 244.02 1379.52 248.016C1375.3 251.79 1370.41 254.676 1364.85 256.674C1359.29 258.672 1353.06 260.226 1346.17 261.336C1339.5 262.446 1332.05 263.778 1323.83 265.332C1321.83 265.776 1320.16 265.665 1318.82 264.999C1317.49 264.555 1315.93 264.333 1314.15 264.333C1309.04 265.443 1302.93 266.442 1295.81 267.33C1288.69 268.218 1281.47 268.551 1274.13 268.329C1266.8 268.107 1259.79 267.108 1253.12 265.332C1246.45 263.778 1241 260.892 1236.78 256.674C1235 255.12 1233.78 253.344 1233.11 251.346C1232.67 249.125 1231.22 247.461 1228.77 246.351C1228.55 243.465 1228.1 240.245 1227.44 236.694C1226.78 233.141 1226.11 229.478 1225.44 225.704C1224.77 221.708 1224.22 217.823 1223.77 214.049C1223.55 210.275 1223.77 206.834 1224.44 203.726C1225.11 200.396 1226.44 197.398 1228.44 194.734C1230.67 192.071 1231.44 189.185 1230.77 186.076C1231.88 185.854 1232.55 185.3 1232.78 184.411C1233 183.301 1233.89 182.857 1235.45 183.079C1236.78 179.083 1238.23 175.309 1239.78 171.757C1241.34 168.205 1242.89 164.764 1244.45 161.433C1246.23 158.103 1247.9 154.773 1249.45 151.444C1251.23 147.891 1252.9 144.006 1254.45 139.788C1251.34 136.902 1249.01 133.794 1247.45 130.464C1246.12 126.912 1245.12 123.471 1244.45 120.141C1243.78 116.589 1243.22 113.036 1242.78 109.484C1242.34 105.71 1241.56 101.936 1240.44 98.1624C1242.67 94.8322 1245.34 92.1678 1248.45 90.1698C1251.78 87.9502 1255.35 86.1739 1259.13 84.8417C1262.91 83.5095 1267.02 82.3997 1271.46 81.5115C1275.91 80.6234 1280.58 79.6244 1285.47 78.5146C1294.37 75.6286 1302.26 73.4085 1309.15 71.8545C1316.27 70.3005 1323.16 69.0794 1329.83 68.1914C1336.72 67.0814 1343.84 66.0824 1351.17 65.1944C1358.51 64.3063 1366.84 62.9743 1376.19 61.1982C1378.18 63.1963 1380.08 64.1953 1381.85 64.1953C1382.75 62.1973 1383.75 61.6422 1384.86 62.5303C1386.19 63.1963 1386.74 62.5303 1386.53 60.5322C1388.75 64.3063 1391.53 67.5254 1394.86 70.1895C1398.42 72.6315 1402.31 74.7406 1406.54 76.5166Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1465.65 229.366C1465.43 227.813 1465.09 226.148 1464.65 224.372L1463.31 221.708C1461.31 219.932 1458.53 218.822 1454.98 218.378C1451.64 217.711 1448.19 216.824 1444.64 215.713C1442.41 215.269 1439.75 214.825 1436.64 214.382C1433.74 213.715 1431.74 213.05 1430.63 212.383L1426.63 210.053L1423.63 214.382C1421.18 217.934 1419.41 220.487 1418.29 222.04C1417.18 223.595 1416.07 224.927 1414.96 226.037C1414.07 226.924 1412.96 227.813 1411.62 228.701C1410.29 229.589 1408.28 231.032 1405.62 233.03L1409.62 239.357L1405.62 242.354L1410.29 247.016C1410.95 247.905 1411.51 249.792 1411.96 252.678C1412.4 255.785 1413.84 259.449 1416.29 263.666C1418.29 264.777 1420.07 265.998 1421.63 267.33C1423.19 268.662 1425.3 270.549 1427.96 272.991H1431.63C1434.52 272.991 1437.75 272.547 1441.3 271.659L1445.97 270.993L1446.98 266.997C1447.42 266.553 1447.98 266.109 1448.64 265.664C1449.53 265.443 1450.31 265.109 1450.97 264.665C1452.53 264 1453.98 263.222 1455.31 262.335C1456.86 261.447 1458.2 260.225 1459.31 258.672L1460.98 254.676C1460.98 253.122 1460.87 252.234 1460.64 252.011C1460.43 251.567 1460.31 251.235 1460.31 251.012C1460.31 250.791 1460.43 250.457 1460.64 250.013C1460.87 249.569 1461.31 248.57 1461.98 247.016C1463.54 243.242 1464.98 239.024 1466.32 234.362C1466.09 232.586 1465.88 230.921 1465.65 229.366Z"
                    fill="#1CE783"
                  />
                  <path
                    d="M1497.67 34.8908C1497.67 36.8888 1497.33 39.3308 1496.67 42.2169C1496.22 45.103 1495.77 47.9891 1495.33 50.8752C1494.89 53.7613 1494.78 56.4249 1495 58.8669C1495.22 61.0873 1496.22 62.5304 1498 63.1961C1494 74.9629 1491.22 84.8419 1489.66 92.8345C1488.33 100.826 1487.1 108.486 1485.99 115.812C1485.1 122.916 1483.88 130.464 1482.32 138.456C1480.77 146.448 1477.99 156.216 1473.99 167.761C1471.54 174.865 1468.54 179.86 1464.98 182.746C1461.43 185.41 1457.65 186.742 1453.64 186.742C1449.64 186.742 1445.52 185.632 1441.3 183.413C1437.08 181.192 1433.19 178.75 1429.63 176.086C1428.96 171.868 1428.85 166.762 1429.29 160.768C1429.96 154.552 1430.75 148.114 1431.63 141.453C1432.52 134.793 1433.41 128.466 1434.3 122.472C1435.19 116.256 1435.85 111.038 1436.3 106.821C1438.52 104.378 1440.08 102.38 1440.97 100.826C1441.86 99.2724 1442.41 97.6069 1442.64 95.8313C1443.08 94.055 1443.41 91.8355 1443.64 89.171C1443.86 86.5073 1444.41 82.7331 1445.31 77.849C1445.75 75.407 1445.52 73.2975 1444.64 71.522C1443.97 69.5232 1443.86 67.6369 1444.31 65.8606C1444.75 64.9724 1445.42 64.3067 1446.31 63.8626C1447.42 63.4185 1448.09 62.6412 1448.31 61.5314C1449.2 58.6453 1449.42 56.425 1448.97 54.8711C1448.53 53.0956 1448.86 50.986 1449.97 48.5439C1451.09 46.7684 1452.42 43.9932 1453.98 40.2189C1455.75 36.223 1456.42 32.1155 1455.98 27.8979C1457.98 26.3433 1459.87 24.5678 1461.64 22.5698C1463.42 20.5711 1465.21 18.7956 1466.98 17.2417C1468.99 15.4654 1471.1 14.0224 1473.32 12.9126C1475.76 11.802 1478.66 11.2471 1481.99 11.2471C1483.77 13.6891 1485.1 16.0203 1485.99 18.2407C1486.89 20.4603 1487.66 22.5698 1488.33 24.5678C1489.21 26.5657 1490.33 28.4529 1491.66 30.2284C1492.99 32.0047 1495 33.5586 1497.67 34.8908Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="1498" height="279" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </Link>

          <div
            onClick={handleToggle}
            className="text-black hover:text-orange md:hidden text-white cursor-pointer"
            href="#"
          >
            <IoReorderThree size={48}></IoReorderThree>
          </div>
        </div>
        {/*EndLogo */}

        {/*Search */}
        <form className={'mb-4 w-full md:mx-2 md:mb-0 md:w-1/4'}>
          <label className="hidden" htmlFor="search-form">
            Search
          </label>
          <input
            className="text-white border bg-custom-gray border-dotted stroke-dasharray: 6; focus:border-orange p-2 rounded-lg shadow-inner w-full"
            placeholder="Search"
            type="text"
          />
          <button className="hidden">Submit</button>
        </form>
        {/*End Search */}

        {/*Nav*/}
        <div ref={toggleRef}>
          <NavButtons className={`${isOpen ? 'block' : 'hidden'} md:flex`} />
        </div>
      </div>
    </header>
  )
}

const NavButtons = ({ className }) => {
  const auth = useAuth()
  const [mounted, setMounted] = useState(false)
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      {auth && auth.user ? (
        <nav className={`flex flex-col md:flex-row md:items-center ${className}`}>
          <Link href={'/template'}>
            <TertiaryBtn className={'w-full md:w-max justify-center my-2'} mono={true}>
              Template
            </TertiaryBtn>
          </Link>
          <Link href={'/create'}>
            <PrimaryBtn className={'w-full md:w-max justify-center my-2'}>
              <IoCreate size={18} className={'fill-current inline-flex self-center mr-2'} /> Meme
            </PrimaryBtn>
          </Link>
          <Link href={'/profile'}>
            <TertiaryBtn className={'w-full md:w-max justify-center my-2'} mono={true}>
              <IoPerson size={18} className={'fill-current inline-flex self-center mr-2'} /> Profile
            </TertiaryBtn>
          </Link>
        </nav>
      ) : (
        <nav className={`flex flex-col md:flex-row md:items-center ${className}`}>
          <Link href={'/login'}>
            <TertiaryBtn className={'w-full md:w-max justify-center my-2'} mono={true}>
              <IoLogIn size={18} className={'fill-current inline-flex self-center mr-2'} /> Log in
            </TertiaryBtn>
          </Link>
          <Link href={'/signup'}>
            <PrimaryBtn className={'w-full md:w-max justify-center my-2'}>Sign up</PrimaryBtn>
          </Link>
        </nav>
      )}
    </>
  )
}

NavButtons.propTypes = {
  className: PropTypes.string,
}
