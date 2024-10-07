<div class="ocean">
    <div class="wave"></div>
    <div class="wave wave2"></div>
  </div>
  
  <style>
    .ocean {
    height: 5%;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #3d82f1;
  }
  
  .wave {
    background: url('$lib/assets/ui/wave.svg') repeat-x;
    position: absolute;
    width: 6400px;
    top: -198px;
    left: 0;
    height: 198px;
    transform: translate(0, 0, 0);
    animation: wave 7s ease infinite;
  }
  
  .wave:nth-of-type(2) {
    top: -168px;
    animation: swell 4s ease infinite;
    opacity: 1;
  }
  
  @keyframes wave {
    0% { margin-left: 0; }
    100% { margin-left: -1600px;}
  }
  @keyframes swell {
    0%, 100% {
      transform: translate(0, -30px);
    }
    50% {
      transform: translate(0, 5px);
    }
  }
  </style>