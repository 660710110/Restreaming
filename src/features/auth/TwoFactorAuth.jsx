import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, X, QrCode, Shield, Clock, RefreshCw } from 'lucide-react';

const TwoFactorAuth = ({ authData, onBackToLogin, onSuccess, isDarkMode }) => {
  const [step, setStep] = useState('landing');
  const [instructionType, setInstructionType] = useState('token');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleMethodSelect = (type) => {
    setSelectedMethod(type);
    setStep(type);
  };

  const handleVerify = async (code) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const handleShowInstructions = (type) => {
    setInstructionType(type);
    setStep('instructions');
  };

  const handleCloseInstructions = () => {
    setStep(selectedMethod || 'selection');
  };

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onContinue={() => setStep('selection')} isDarkMode={isDarkMode} />;
      case 'selection':
        return <MethodSelection onSelect={handleMethodSelect} onBack={onBackToLogin} isDarkMode={isDarkMode} />;
      case 'streaming_token':
        return (
          <TokenVerification
            isVerifying={isVerifying}
            onVerify={handleVerify}
            onBack={() => setStep('selection')}
            onShowHelp={() => handleShowInstructions('token')}
            isDarkMode={isDarkMode}
          />
        );
      case 'qr_scanner':
        return (
          <QRVerification
            isVerifying={isVerifying}
            onVerify={handleVerify}
            onBack={() => setStep('selection')}
            onShowHelp={() => handleShowInstructions('qr')}
            isDarkMode={isDarkMode}
          />
        );
      case 'otp_app':
        return (
          <AuthenticatorVerification
            isVerifying={isVerifying}
            onVerify={handleVerify}
            onBack={() => setStep('selection')}
            onShowHelp={() => handleShowInstructions('auth')}
            isDarkMode={isDarkMode}
          />
        );
      case 'instructions':
        return <Instructions type={instructionType} onClose={handleCloseInstructions} isDarkMode={isDarkMode} />;
      default:
        return <Landing onContinue={() => setStep('selection')} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[500px] relative py-4">
      {renderStep()}
    </div>
  );
};

/* ─────────────────────────────────────────
   LANDING
───────────────────────────────────────── */
const Landing = ({ onContinue, isDarkMode }) => (
  <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[520px] overflow-hidden shadow-2xl transition-colors duration-300">
    <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a] flex items-center justify-center">
      <span className="text-gray-700 dark:text-white font-semibold text-sm tracking-wide transition-colors">Settrade Streaming</span>
    </div>

    <div className="px-10 py-12 flex flex-col items-center text-center">
      <div className="relative mb-10">
        <div className="w-32 h-32 rounded-full bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/50 flex items-center justify-center transition-colors">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0d1e35] border border-blue-100 dark:border-[#1e6afb]/30 flex items-center justify-center transition-colors">
            <ShieldIcon />
          </div>
        </div>
        <div className={`absolute top-1 right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 ${isDarkMode ? 'border-[#0b1829]' : 'border-white'}`}>
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-gray-900 dark:text-white font-bold text-xl mb-4 transition-colors">Login with 2-Factor Authentication</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-10 max-w-[300px] transition-colors">
        To add an extra layer of security by using your username/password and your physical devices.
      </p>

      <button
        onClick={onContinue}
        className="w-full bg-[#1b84ff] hover:bg-[#006ee6] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        continue <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   SELECT METHOD
───────────────────────────────────────── */
const MethodSelection = ({ onSelect, onBack, isDarkMode }) => (
  <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl transition-colors duration-300">
    <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a]">
      <span className="text-gray-700 dark:text-white font-semibold text-sm tracking-wide transition-colors">
        Settrade Streaming — 2FA Verification
      </span>
    </div>

    <div className="px-10 py-6 flex flex-col items-center text-center">
      <h1 className="text-gray-900 dark:text-white font-bold text-2xl mb-3 transition-colors">How do you want to login?</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-[420px] transition-colors">
        Please select a verify option: Streaming Token or QR Code and prepare a device that
        can use Streaming application.
      </p>

      <div className="flex items-center gap-6 w-full justify-center mb-2">
        {/* Streaming Token card */}
        <button
          onClick={() => onSelect('streaming_token')}
          className="flex-1 max-w-[210px] min-h-[220px] bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 hover:border-blue-500 dark:hover:border-[#1b84ff] rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-5 transition-all hover:bg-gray-100 dark:hover:bg-[#0d2040] active:scale-[0.97] cursor-pointer group shadow-sm"
        >
          {/* ✅ นำ isDarkMode ออกเพื่อให้สีพื้นหลังคงที่ */}
          <PhoneIcon size="card" />
          <span className="text-gray-900 dark:text-white font-bold text-base transition-colors">Streaming Token</span>
        </button>

        <span className="text-gray-400 dark:text-white font-semibold text-base flex-shrink-0 transition-colors">or</span>

        {/* QR Code card */}
        <button
          onClick={() => onSelect('qr_scanner')}
          className="flex-1 max-w-[210px] min-h-[220px] bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 hover:border-blue-500 dark:hover:border-[#1b84ff] rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-5 transition-all hover:bg-gray-100 dark:hover:bg-[#0d2040] active:scale-[0.97] cursor-pointer group shadow-sm"
        >
          <QrCodeIcon isDarkMode={isDarkMode} />
          <span className="text-gray-900 dark:text-white font-bold text-base transition-colors">QR Code</span>
        </button>
      </div>
    </div>

    <div className="bg-gray-50 dark:bg-[#0d1e35] border-t border-gray-200 dark:border-[#1e3a8a] px-8 py-4 text-center transition-colors">
      <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
        In case you don&apos;t have a compatible device with Streaming application, please click{' '}
        <button
          onClick={() => onSelect('otp_app')}
          className="text-blue-600 dark:text-[#1b84ff] hover:underline font-medium transition-colors"
        >
          here
        </button>
        .
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   STREAMING TOKEN
───────────────────────────────────────── */
const TokenVerification = ({ isVerifying, onVerify, onBack, onShowHelp, isDarkMode }) => (
  <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl relative transition-colors duration-300">
    {isVerifying && <LoadingOverlay label="Verifying Token..." isDarkMode={isDarkMode} />}

    <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a] flex justify-between items-center transition-colors">
      <span className="text-gray-700 dark:text-white font-semibold text-sm transition-colors">Settrade Streaming</span>
      <button
        onClick={onBack}
        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-1 text-xs transition font-medium"
      >
        <ChevronLeft size={15} /> Back
      </button>
    </div>

    <div className="px-10 py-10 flex flex-col items-center text-center">
      <div className="w-28 h-28 bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 rounded-2xl flex items-center justify-center mb-7 transition-colors">
        {/* ✅ นำ isDarkMode ออกเพื่อให้สีพื้นหลังคงที่ */}
        <PhoneIcon size="lg" />
      </div>

      <h1 className="text-gray-900 dark:text-white font-bold text-xl mb-3 transition-colors">Streaming Token</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-[300px] transition-colors">
        Please use this 6-digit token to fill in Streaming application on your mobile device.
      </p>

      <div className="w-full bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 rounded-xl px-8 py-6 mb-5 flex justify-between items-center transition-colors">
        {[1, 4, 3, 9, 0, 2].map((num, i) => (
          <span key={i} className="text-5xl font-bold text-gray-800 dark:text-white tracking-widest transition-colors">{num}</span>
        ))}
      </div>

      <p className="text-gray-400 dark:text-gray-500 text-xs mb-8 transition-colors">
        Click{' '}
        <button onClick={onShowHelp} className="text-blue-600 dark:text-[#1b84ff] hover:underline font-medium transition-colors">
          here
        </button>{' '}
        to see how to use token
      </p>

      <button
        onClick={onVerify}
        className="w-full bg-[#1b84ff] hover:bg-[#006ee6] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        continue <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   QR CODE
───────────────────────────────────────── */
const QRVerification = ({ isVerifying, onVerify, onBack, onShowHelp, isDarkMode }) => {
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl relative transition-colors duration-300">
      {isVerifying && <LoadingOverlay label="Verifying QR Scan..." isDarkMode={isDarkMode} />}

      <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a] flex justify-between items-center transition-colors">
        <span className="text-gray-700 dark:text-white font-semibold text-sm transition-colors">Settrade Streaming - Verify with &apos;QR Code&apos;</span>
        <button
          onClick={onBack}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-1 text-xs transition font-medium"
        >
          <ChevronLeft size={15} /> Back
        </button>
      </div>

      <div className="px-10 py-10 flex flex-col items-center text-center">
        <h1 className="text-gray-900 dark:text-white font-bold text-xl mb-3 transition-colors">QR Code</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-[300px] transition-colors">
          Please scan this QR Code via Streaming application on mobile.
        </p>

        <div className="bg-white rounded-2xl p-4 border-2 border-[#1b84ff] mb-5 shadow-[0_0_20px_rgba(27,132,255,0.2)]">
          <QrCode size={180} className="text-gray-900" strokeWidth={1.5} />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-2 transition-colors">
          <Clock size={14} />
          QR Code expires in{' '}
          <span className="text-orange-600 dark:text-orange-400 font-bold transition-colors">{seconds} s</span>
          <button
            onClick={() => setSeconds(59)}
            className="text-gray-400 hover:text-blue-600 dark:hover:text-white ml-1 transition"
          >
            <RefreshCw size={12} />
          </button>
        </p>

        <p className="text-gray-400 dark:text-gray-500 text-xs transition-colors">
          Click{' '}
          <button onClick={onShowHelp} className="text-blue-600 dark:text-[#1b84ff] hover:underline font-medium transition-colors">
            here
          </button>{' '}
          to see how to use QR Code
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   AUTHENTICATOR APP
───────────────────────────────────────── */
const AuthenticatorVerification = ({ isVerifying, onVerify, onBack, onShowHelp, isDarkMode }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const v = value.slice(-1);
    const newCode = [...code];
    newCode[index] = v;
    setCode(newCode);
    if (v && index < 5) inputRefs.current[index + 1]?.focus();
    if (newCode.every(d => d !== '')) onVerify(newCode.join(''));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl relative transition-colors duration-300">
      {isVerifying && <LoadingOverlay label="Checking Code..." isDarkMode={isDarkMode} />}

      <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a] flex justify-between items-center transition-colors">
        <span className="text-gray-700 dark:text-white font-semibold text-sm transition-colors">Settrade Streaming</span>
        <button
          onClick={onBack}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-1 text-xs transition font-medium"
        >
          <ChevronLeft size={15} /> Back
        </button>
      </div>

      <div className="px-10 py-10 flex flex-col items-center text-center">
        {/* Shield icon box */}
        <div className="w-28 h-28 bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 rounded-2xl flex items-center justify-center mb-7 transition-colors">
          <ShieldIcon size="lg" />
        </div>

        <h1 className="text-gray-900 dark:text-white font-bold text-xl mb-3 transition-colors">Authenticator App</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-[320px] transition-colors">
          Open Google Authenticator or Microsoft Authenticator and enter the 6-digit code shown in the app.
        </p>

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-8 w-full px-2">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={el => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              autoFocus={i === 0}
              className={`w-12 h-14 md:w-14 md:h-16 text-3xl font-bold rounded-xl text-center transition-all outline-none border-2
                ${isDarkMode 
                  ? 'bg-[#0d1e35] text-white ' + (digit ? 'border-[#1b84ff]' : 'border-[#1e3a8a]/60') 
                  : 'bg-white text-gray-800 ' + (digit ? 'border-[#1b84ff]' : 'border-gray-200')}
                focus:border-[#1b84ff] focus:ring-1 focus:ring-[#1b84ff]/30
              `}
            />
          ))}
        </div>

        <p className="text-gray-400 dark:text-gray-500 text-xs transition-colors">
          Click{' '}
          <button onClick={onShowHelp} className="text-blue-600 dark:text-[#1b84ff] hover:underline font-medium transition-colors">
            here
          </button>{' '}
          to see how to use token
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   INSTRUCTIONS MODAL
───────────────────────────────────────── */
const Instructions = ({ type, onClose, isDarkMode }) => {
  const steps = {
    token: [
      { num: '01', text: "Open Streaming App and select menu 'Login PC'" },
      { num: '02', text: "Select a verify option 'Streaming Token'" },
      { num: '03', text: "Enter '6 digits token' displayed on the PC Screen" },
    ],
    qr: [
      { num: '01', text: "Open Streaming App and select menu 'Login PC'" },
      { num: '02', text: "Select verify option 'QR Code' in the app" },
      { num: '03', text: "Point the camera at the QR code on the screen" },
    ],
    auth: [
      { num: '01', text: "Open the Google Authenticator app or Microsoft Authenticator." },
      { num: '02', text: "Search for \"Settrade Streaming\" in your account list." },
      { num: '03', text: "Enter the 6-digit code from the app on your PC." },
    ],
  };

  const title = type === 'token' ? 'Streaming Token' : type === 'qr' ? 'QR Code' : 'Streaming Token';
  const data = steps[type] || steps.token;

  return (
    <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[900px] overflow-hidden shadow-2xl relative mx-4 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a] flex justify-between items-center transition-colors">
        <span className="text-gray-700 dark:text-white font-semibold text-sm transition-colors">
          Settrade Streaming{type !== 'token' ? ` - Verify with '${title}'` : ''}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 dark:hover:text-white transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>

      {/* Steps */}
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
          {data.map((s, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div className="hidden md:flex items-center pt-20 text-gray-300 dark:text-gray-700 transition-colors">
                  <ArrowRight size={28} />
                </div>
              )}
              <div className="flex-1 flex flex-col items-center text-center">
                {/* Phone mockup placeholder */}
                <div className="w-48 h-64 bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/40 rounded-3xl mb-6 flex items-center justify-center transition-colors">
                  <InstructionVisual type={type} step={idx + 1} isDarkMode={isDarkMode} />
                </div>
                <span className="text-5xl font-black text-gray-200 dark:text-white/5 mb-3 font-mono transition-colors">{s.num}</span>
                <p className="text-gray-800 dark:text-white font-semibold text-sm leading-snug max-w-[180px] transition-colors">{s.text}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   INSTRUCTION VISUAL (phone mockups)
───────────────────────────────────────── */
const InstructionVisual = ({ type, step, isDarkMode }) => {
  const getSubColor = (dark, light) => isDarkMode ? dark : light;

  if (type === 'token') {
    if (step === 1) return (
      <div className="w-full h-full p-4 flex flex-col gap-3 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#1b84ff] flex items-center justify-center text-[9px] font-bold text-white">S</div>
          <div className="space-y-1">
            <div className={`w-14 h-1.5 ${getSubColor('bg-[#1e3a8a]', 'bg-blue-200')} rounded`}></div>
            <div className={`w-10 h-1 ${getSubColor('bg-[#1e3a8a]/50', 'bg-blue-100')} rounded`}></div>
          </div>
        </div>
        <div className="space-y-2 mt-3">
          <div className={`h-7 ${getSubColor('bg-[#1e3a8a]/30', 'bg-white')} rounded-lg border ${getSubColor('border-[#1e3a8a]/20', 'border-gray-200')}`}></div>
          <div className={`h-7 ${getSubColor('bg-[#1e3a8a]/30', 'bg-white')} rounded-lg border ${getSubColor('border-[#1e3a8a]/20', 'border-gray-200')}`}></div>
          <div className="h-7 bg-[#1b84ff] rounded-lg"></div>
        </div>
      </div>
    );
    if (step === 2) return (
      <div className="w-full h-full p-4 pt-8 flex flex-col gap-2">
        <div className="p-3 bg-[#1b84ff]/15 border border-[#1b84ff]/50 rounded-xl flex items-center gap-2 relative">
          <div className="absolute -top-2 left-2 bg-[#1b84ff] text-[7px] text-white px-2 py-0.5 rounded-full">Selected</div>
          <div className="w-5 h-5 flex items-center justify-center">
             {/* ✅ นำ isDarkMode ออก */}
            <PhoneIcon size="xs" />
          </div>
          <div className="w-16 h-2 bg-[#1b84ff]/40 rounded"></div>
        </div>
        <div className={`p-3 ${getSubColor('bg-[#1e3a8a]/20', 'bg-gray-100')} border ${getSubColor('border-[#1e3a8a]/30', 'border-gray-200')} rounded-xl flex items-center gap-2`}>
          <QrCode size={14} className="text-gray-400" />
          <div className={`w-14 h-2 ${getSubColor('bg-[#1e3a8a]/40', 'bg-gray-300')} rounded`}></div>
        </div>
      </div>
    );
    if (step === 3) return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-3">
        <div className={`w-full ${getSubColor('bg-[#1e3a8a]/30', 'bg-white')} rounded-lg p-3 border ${getSubColor('border-[#1e3a8a]/40', 'border-gray-200')}`}>
          <div className="flex justify-between">
            {[1,4,3,9,0,2].map((n,i) => (
              <span key={i} className="text-lg font-bold text-[#1b84ff]">{n}</span>
            ))}
          </div>
        </div>
        <div className="w-full h-7 bg-[#1b84ff] rounded-lg"></div>
      </div>
    );
  }

  if (type === 'qr') {
    if (step === 1) return (
      <div className="w-full h-full p-4 flex flex-col gap-3 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#1b84ff] flex items-center justify-center text-[9px] font-bold text-white">S</div>
          <div className={`w-14 h-1.5 ${getSubColor('bg-[#1e3a8a]', 'bg-blue-200')} rounded`}></div>
        </div>
        <div className="space-y-2 mt-3">
          <div className={`h-7 ${getSubColor('bg-[#1e3a8a]/30', 'bg-white')} rounded-lg`}></div>
          <div className={`h-7 ${getSubColor('bg-[#1e3a8a]/30', 'bg-white')} rounded-lg`}></div>
          <div className="h-7 bg-[#1b84ff] rounded-lg"></div>
        </div>
      </div>
    );
    if (step === 2) return (
      <div className="w-full h-full p-4 pt-8 flex flex-col gap-2">
        <div className={`p-3 ${getSubColor('bg-[#1e3a8a]/20', 'bg-gray-100')} border ${getSubColor('border-[#1e3a8a]/30', 'border-gray-200')} rounded-xl flex items-center gap-2`}>
           {/* ✅ นำ isDarkMode ออก */}
          <div className="w-4 h-4"><PhoneIcon size="xs" /></div>
          <div className={`w-14 h-2 ${getSubColor('bg-[#1e3a8a]/40', 'bg-gray-300')} rounded`}></div>
        </div>
        <div className="p-3 bg-[#1b84ff]/15 border border-[#1b84ff]/50 rounded-xl flex items-center gap-2 relative">
          <div className="absolute -top-2 right-2 bg-[#1b84ff] text-[7px] text-white px-2 py-0.5 rounded-full">Selected</div>
          <QrCode size={14} className="text-[#1b84ff]" />
          <div className="w-16 h-2 bg-[#1b84ff]/40 rounded"></div>
        </div>
      </div>
    );
    if (step === 3) return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className={`w-24 h-24 ${getSubColor('bg-black/60', 'bg-gray-800/80')} rounded-xl border-2 border-[#1b84ff]/50 flex items-center justify-center relative`}>
          <QrCode size={48} className="text-white/20" />
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#1b84ff] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#1b84ff] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#1b84ff] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#1b84ff] rounded-br-xl"></div>
        </div>
      </div>
    );
  }

  // ส่วน Visual ของ Auth App
  if (type === 'auth') {
    if (step === 1) return (
      <div className="w-full h-full p-4 pt-8 flex flex-col items-center gap-3">
        <div className="grid grid-cols-3 gap-2 w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-10 rounded-xl flex items-center justify-center border ${i === 0 ? 'bg-[#1b84ff]/20 border-[#1b84ff]/50' : getSubColor('bg-[#1e3a8a]/20 border-[#1e3a8a]/30', 'bg-gray-100 border-gray-200')}`}>
              {i === 0 && <ShieldIcon size="xs" />}
            </div>
          ))}
        </div>
      </div>
    );
    if (step === 2) return (
      <div className="w-full h-full p-3 pt-6 flex flex-col gap-2">
        <div className="h-6 bg-[#1b84ff] rounded-lg flex items-center px-3">
          <div className="w-12 h-1.5 bg-white/30 rounded"></div>
        </div>
        <div className={`p-3 ${getSubColor('bg-[#1e3a8a]/20', 'bg-gray-100')} rounded-xl`}>
          <div className={`w-14 h-1 ${getSubColor('bg-gray-600', 'bg-gray-300')} rounded mb-1`}></div>
          <div className={`text-base font-bold font-mono ${getSubColor('text-gray-500', 'text-gray-400')} tracking-widest`}>4 8 2 1 9 3</div>
        </div>
        <div className="p-3 bg-[#1b84ff]/15 border-2 border-[#1b84ff]/50 rounded-xl">
          <div className="w-16 h-1 bg-[#1b84ff]/40 rounded mb-1"></div>
          <div className="text-base font-bold font-mono text-[#1b84ff] tracking-widest">3 8 4 7 2 9</div>
        </div>
      </div>
    );
    if (step === 3) return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-3">
        <div className="flex gap-1.5 justify-center">
          {['3','8','4','—','—','—'].map((n, i) => (
            <div key={i} className={`w-7 h-9 rounded-lg border flex items-center justify-center text-sm font-bold ${i < 3 ? 'bg-[#1e3a8a]/40 border-[#1b84ff]/40 text-[#1b84ff]' : getSubColor('bg-[#1e3a8a]/20 border-[#1e3a8a]/30 text-gray-600', 'bg-gray-100 border-gray-200 text-gray-400')}`}>{n}</div>
          ))}
        </div>
        <div className="w-full h-7 bg-[#1b84ff] rounded-lg"></div>
      </div>
    );
  }

  return null;
};

/* ─────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────── */
const LoadingOverlay = ({ label, isDarkMode }) => (
  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#0b1829]/70' : 'bg-white/70'} backdrop-blur-[2px] z-50 flex flex-col items-center justify-center transition-colors`}>
    <div className="w-10 h-10 border-4 border-[#1b84ff]/20 border-t-[#1b84ff] rounded-full animate-spin mb-4"></div>
    <p className="text-[#1b84ff] font-bold text-sm animate-pulse">{label}</p>
  </div>
);

const ShieldIcon = ({ size = 'md' }) => {
  const s = size === 'lg' ? 56 : size === 'xs' ? 14 : 40;
  return (
    <svg width={s} height={s} viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L4 12V32C4 46.4 14.8 59.6 28 64C41.2 59.6 52 46.4 52 32V12L28 2Z" fill="url(#shieldGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <path d="M28 2L52 12V32C52 46.4 41.2 59.6 28 64V2Z" fill="url(#shieldGradRight)"/>
      <path d="M20 32L26 38L36 26" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="52" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e84142"/><stop offset="1" stopColor="#b91c1c"/>
        </linearGradient>
        <linearGradient id="shieldGradRight" x1="28" y1="2" x2="52" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d1d5db" stopOpacity="0.9"/><stop offset="1" stopColor="#9ca3af" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

/* Phone icon (แก้ไขให้พื้นหลังสีเข้มคงที่เสมอ) */
const PhoneIcon = ({ size = 'md' }) => {
  const scale = size === 'lg' ? 1 : size === 'card' ? 0.82 : size === 'xs' ? 0.35 : 0.6;
  const w = Math.round(60 * scale);
  const h = Math.round(80 * scale);
  const appColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#06b6d4','#10b981','#f59e0b','#6366f1','#14b8a6'];
  const cellSize = Math.round(10 * scale);
  const gap = Math.round(3 * scale);
  const padding = Math.round(5 * scale);
  const cols = 3;
  const rows = 4;

  return (
    <div
      style={{ width: w, height: h }}
      // ✅ ลบการเช็ค isDarkMode เพื่อให้เป็นธีมสีเข้มตามแอปโทรศัพท์จริงเสมอ
      className="bg-[#1a1a2e] rounded-xl border-2 border-gray-700 flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0"
    >
      <div style={{ width: Math.round(16 * scale), height: Math.round(4 * scale) }} className="absolute top-0 bg-gray-800 rounded-b-lg z-10"></div>
      <div style={{ paddingTop: Math.round(8 * scale) }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: gap, padding: padding }}>
          {appColors.slice(0, cols * rows).map((color, i) => (
            <div key={i} style={{ width: cellSize, height: cellSize, backgroundColor: color }} className="rounded"></div>
          ))}
        </div>
        <div style={{ width: Math.round(20 * scale), height: Math.round(2 * scale) }} className="bg-gray-500 rounded-full mx-auto mt-1"></div>
      </div>
    </div>
  );
};

const QrCodeIcon = ({ isDarkMode }) => (
  <div className="w-[72px] h-[72px] bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0 border border-gray-200 shadow-sm transition-colors">
    <QrCode size={52} className="text-gray-900" strokeWidth={1.5} />
  </div>
);

export default TwoFactorAuth;