import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, X, QrCode, Shield, Clock, RefreshCw } from 'lucide-react';

const TwoFactorAuth = ({ authData, onBackToLogin, onSuccess }) => {
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
        return <Landing onContinue={() => setStep('selection')} />;
      case 'selection':
        return <MethodSelection onSelect={handleMethodSelect} onBack={onBackToLogin} />;
      case 'streaming_token':
        return (
          <TokenVerification
            isVerifying={isVerifying}
            onVerify={handleVerify}
            onBack={() => setStep('selection')}
            onShowHelp={() => handleShowInstructions('token')}
          />
        );
      case 'qr_scanner':
        return (
          <QRVerification
            isVerifying={isVerifying}
            onVerify={handleVerify}
            onBack={() => setStep('selection')}
            onShowHelp={() => handleShowInstructions('qr')}
          />
        );
      case 'otp_app':
        return (
          <AuthenticatorVerification
            isVerifying={isVerifying}
            onVerify={handleVerify}
            onBack={() => setStep('selection')}
            onShowHelp={() => handleShowInstructions('auth')}
          />
        );
      case 'instructions':
        return <Instructions type={instructionType} onClose={handleCloseInstructions} />;
      default:
        return <Landing onContinue={() => setStep('selection')} />;
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
const Landing = ({ onContinue }) => (
  <div className="bg-[#0b1829] border border-[#1e3a8a] rounded-2xl w-full max-w-[520px] overflow-hidden shadow-2xl">
    {/* Header */}
    <div className="bg-[#0d1e35] px-6 py-4 border-b border-[#1e3a8a] flex items-center justify-center">
      <span className="text-white font-semibold text-sm tracking-wide">Settrade Streaming</span>
    </div>

    {/* Body */}
    <div className="px-10 py-12 flex flex-col items-center text-center">
      {/* Shield icon */}
      <div className="relative mb-10">
        <div className="w-32 h-32 rounded-full bg-[#0d1e35] border border-[#1e3a8a]/50 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#0d1e35] border border-[#1e6afb]/30 flex items-center justify-center">
            <ShieldIcon />
          </div>
        </div>
        {/* Green badge */}
        <div className="absolute top-1 right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#0b1829]">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-white font-bold text-xl mb-4">Login with 2-Factor Authentication</h1>
      <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-[300px]">
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
const MethodSelection = ({ onSelect, onBack }) => (
  <div className="bg-white dark:bg-[#0b1829] border border-gray-200 dark:border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl transition-colors duration-300">
    {/* Header */}
    <div className="bg-gray-50 dark:bg-[#0d1e35] px-6 py-4 border-b border-gray-200 dark:border-[#1e3a8a]">
      <span className="text-gray-700 dark:text-white font-semibold text-sm tracking-wide">
        Settrade Streaming — 2FA Verification
      </span>
    </div>

    {/* Body */}
    <div className="px-10 py-6 flex flex-col items-center text-center">
      <h1 className="text-gray-900 dark:text-white font-bold text-2xl mb-3">How do you want to login?</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-[420px]">
        Please select a verify option: Streaming Token or QR Code and prepare a device that
        can use Streaming application.
      </p>

      {/* Cards row */}
      <div className="flex items-center gap-6 w-full justify-center mb-2">
        {/* Streaming Token card */}
        <button
          onClick={() => onSelect('streaming_token')}
          className="flex-1 max-w-[210px] min-h-[220px] bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 hover:border-blue-500 dark:hover:border-[#1b84ff] rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-5 transition-all hover:bg-gray-100 dark:hover:bg-[#0d2040] active:scale-[0.97] cursor-pointer group shadow-sm"
        >
          <PhoneIcon size="card" />
          <span className="text-gray-900 dark:text-white font-bold text-base">Streaming Token</span>
        </button>

        <span className="text-gray-500 dark:text-white font-semibold text-base flex-shrink-0">or</span>

        {/* QR Code card */}
        <button
          onClick={() => onSelect('qr_scanner')}
          className="flex-1 max-w-[210px] min-h-[220px] bg-gray-50 dark:bg-[#0d1e35] border border-gray-200 dark:border-[#1e3a8a]/60 hover:border-blue-500 dark:hover:border-[#1b84ff] rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-5 transition-all hover:bg-gray-100 dark:hover:bg-[#0d2040] active:scale-[0.97] cursor-pointer group shadow-sm"
        >
          <QrCodeIcon />
          <span className="text-gray-900 dark:text-white font-bold text-base">QR Code</span>
        </button>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-gray-50 dark:bg-[#0d1e35] border-t border-gray-200 dark:border-[#1e3a8a] px-8 py-4 text-center">
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        In case you don&apos;t have a compatible device with Streaming application, please click{' '}
        <button
          onClick={() => onSelect('otp_app')}
          className="text-blue-500 dark:text-[#1b84ff] hover:underline font-medium"
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
const TokenVerification = ({ isVerifying, onVerify, onBack, onShowHelp }) => (
  <div className="bg-[#0b1829] border border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl relative">
    {isVerifying && <LoadingOverlay label="Verifying Token..." />}

    {/* Header */}
    <div className="bg-[#0d1e35] px-6 py-4 border-b border-[#1e3a8a] flex justify-between items-center">
      <span className="text-white font-semibold text-sm">Settrade Streaming</span>
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white flex items-center gap-1 text-xs transition font-medium"
      >
        <ChevronLeft size={15} /> Back
      </button>
    </div>

    {/* Body */}
    <div className="px-10 py-10 flex flex-col items-center text-center">
      {/* Phone icon box */}
      <div className="w-28 h-28 bg-[#0d1e35] border border-[#1e3a8a]/60 rounded-2xl flex items-center justify-center mb-7">
        <PhoneIcon size="lg" />
      </div>

      <h1 className="text-white font-bold text-xl mb-3">Streaming Token</h1>
      <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[300px]">
        Please use this 6-digit token to fill in Streaming application on your mobile device.
      </p>

      {/* Token display */}
      <div className="w-full bg-[#0d1e35] border border-[#1e3a8a]/60 rounded-xl px-8 py-6 mb-5 flex justify-between items-center">
        {[1, 4, 3, 9, 0, 2].map((num, i) => (
          <span key={i} className="text-5xl font-bold text-white tracking-widest">{num}</span>
        ))}
      </div>

      <p className="text-gray-500 text-xs mb-8">
        Click{' '}
        <button onClick={onShowHelp} className="text-[#1b84ff] hover:underline font-medium">
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
const QRVerification = ({ isVerifying, onVerify, onBack, onShowHelp }) => {
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="bg-[#0b1829] border border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl relative">
      {isVerifying && <LoadingOverlay label="Verifying QR Scan..." />}

      {/* Header */}
      <div className="bg-[#0d1e35] px-6 py-4 border-b border-[#1e3a8a] flex justify-between items-center">
        <span className="text-white font-semibold text-sm">Settrade Streaming - Verify with &apos;QR Code&apos;</span>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white flex items-center gap-1 text-xs transition font-medium"
        >
          <ChevronLeft size={15} /> Back
        </button>
      </div>

      {/* Body */}
      <div className="px-10 py-10 flex flex-col items-center text-center">
        <h1 className="text-white font-bold text-xl mb-3">QR Code</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[300px]">
          Please scan this QR Code via Streaming application on mobile.
        </p>

        {/* QR code box */}
        <div className="bg-white rounded-2xl p-4 border-2 border-[#1b84ff] mb-5 shadow-[0_0_20px_rgba(27,132,255,0.2)]">
          <QrCode size={180} className="text-gray-900" strokeWidth={1.5} />
        </div>

        {/* Countdown */}
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <Clock size={14} />
          QR Code expires in{' '}
          <span className="text-orange-400 font-bold">{seconds} s</span>
          <button
            onClick={() => setSeconds(59)}
            className="text-gray-500 hover:text-white ml-1 transition"
          >
            <RefreshCw size={12} />
          </button>
        </p>

        <p className="text-gray-500 text-xs">
          Click{' '}
          <button onClick={onShowHelp} className="text-[#1b84ff] hover:underline font-medium">
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
const AuthenticatorVerification = ({ isVerifying, onVerify, onBack, onShowHelp }) => {
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
    <div className="bg-[#0b1829] border border-[#1e3a8a] rounded-2xl w-full max-w-[560px] overflow-hidden shadow-2xl relative">
      {isVerifying && <LoadingOverlay label="Checking Code..." />}

      {/* Header */}
      <div className="bg-[#0d1e35] px-6 py-4 border-b border-[#1e3a8a] flex justify-between items-center">
        <span className="text-white font-semibold text-sm">Settrade Streaming</span>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white flex items-center gap-1 text-xs transition font-medium"
        >
          <ChevronLeft size={15} /> Back
        </button>
      </div>

      {/* Body */}
      <div className="px-10 py-10 flex flex-col items-center text-center">
        {/* Shield icon box */}
        <div className="w-28 h-28 bg-[#0d1e35] border border-[#1e3a8a]/60 rounded-2xl flex items-center justify-center mb-7">
          <ShieldIcon size="lg" />
        </div>

        <h1 className="text-white font-bold text-xl mb-3">Authenticator App</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[320px]">
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
              className={`w-12 h-14 md:w-14 md:h-16 text-3xl font-bold rounded-xl text-center text-white transition-all outline-none
                bg-[#0d1e35] border-2
                ${digit ? 'border-[#1b84ff]' : 'border-[#1e3a8a]/60'}
                focus:border-[#1b84ff] focus:ring-1 focus:ring-[#1b84ff]/30
              `}
            />
          ))}
        </div>

        <p className="text-gray-500 text-xs">
          Click{' '}
          <button onClick={onShowHelp} className="text-[#1b84ff] hover:underline font-medium">
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
const Instructions = ({ type, onClose }) => {
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
    <div className="bg-[#0b1829] border border-[#1e3a8a] rounded-2xl w-full max-w-[900px] overflow-hidden shadow-2xl relative mx-4">
      {/* Header */}
      <div className="bg-[#0d1e35] px-6 py-4 border-b border-[#1e3a8a] flex justify-between items-center">
        <span className="text-white font-semibold text-sm">
          Settrade Streaming{type !== 'token' ? ` - Verify with '${title}'` : ''}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/10"
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
                <div className="hidden md:flex items-center pt-20 text-gray-700">
                  <ArrowRight size={28} />
                </div>
              )}
              <div className="flex-1 flex flex-col items-center text-center">
                {/* Phone mockup placeholder */}
                <div className="w-48 h-64 bg-[#0d1e35] border border-[#1e3a8a]/40 rounded-3xl mb-6 flex items-center justify-center">
                  <InstructionVisual type={type} step={idx + 1} />
                </div>
                <span className="text-5xl font-black text-white/5 mb-3 font-mono">{s.num}</span>
                <p className="text-white font-semibold text-sm leading-snug max-w-[180px]">{s.text}</p>
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
const InstructionVisual = ({ type, step }) => {
  if (type === 'token') {
    if (step === 1) return (
      <div className="w-full h-full p-4 flex flex-col gap-3 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#1b84ff] flex items-center justify-center text-[9px] font-bold text-white">S</div>
          <div className="space-y-1">
            <div className="w-14 h-1.5 bg-[#1e3a8a] rounded"></div>
            <div className="w-10 h-1 bg-[#1e3a8a]/50 rounded"></div>
          </div>
        </div>
        <div className="space-y-2 mt-3">
          <div className="h-7 bg-[#1e3a8a]/30 rounded-lg border border-[#1e3a8a]/20"></div>
          <div className="h-7 bg-[#1e3a8a]/30 rounded-lg border border-[#1e3a8a]/20"></div>
          <div className="h-7 bg-[#1b84ff] rounded-lg"></div>
        </div>
      </div>
    );
    if (step === 2) return (
      <div className="w-full h-full p-4 pt-8 flex flex-col gap-2">
        <div className="p-3 bg-[#1b84ff]/15 border border-[#1b84ff]/50 rounded-xl flex items-center gap-2 relative">
          <div className="absolute -top-2 left-2 bg-[#1b84ff] text-[7px] text-white px-2 py-0.5 rounded-full">Selected</div>
          <div className="w-5 h-5 flex items-center justify-center">
            <PhoneIcon size="xs" />
          </div>
          <div className="w-16 h-2 bg-[#1b84ff]/40 rounded"></div>
        </div>
        <div className="p-3 bg-[#1e3a8a]/20 border border-[#1e3a8a]/30 rounded-xl flex items-center gap-2">
          <QrCode size={14} className="text-gray-500" />
          <div className="w-14 h-2 bg-[#1e3a8a]/40 rounded"></div>
        </div>
      </div>
    );
    if (step === 3) return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-3">
        <div className="w-full bg-[#1e3a8a]/30 rounded-lg p-3 border border-[#1e3a8a]/40">
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
          <div className="w-14 h-1.5 bg-[#1e3a8a] rounded"></div>
        </div>
        <div className="space-y-2 mt-3">
          <div className="h-7 bg-[#1e3a8a]/30 rounded-lg"></div>
          <div className="h-7 bg-[#1e3a8a]/30 rounded-lg"></div>
          <div className="h-7 bg-[#1b84ff] rounded-lg"></div>
        </div>
      </div>
    );
    if (step === 2) return (
      <div className="w-full h-full p-4 pt-8 flex flex-col gap-2">
        <div className="p-3 bg-[#1e3a8a]/20 border border-[#1e3a8a]/30 rounded-xl flex items-center gap-2">
          <div className="w-4 h-4"><PhoneIcon size="xs" /></div>
          <div className="w-14 h-2 bg-[#1e3a8a]/40 rounded"></div>
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
        <div className="w-24 h-24 bg-black/60 rounded-xl border-2 border-[#1b84ff]/50 flex items-center justify-center relative">
          <QrCode size={48} className="text-white/20" />
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#1b84ff] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#1b84ff] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#1b84ff] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#1b84ff] rounded-br-xl"></div>
        </div>
      </div>
    );
  }

  if (type === 'auth') {
    if (step === 1) return (
      <div className="w-full h-full p-4 pt-8 flex flex-col items-center gap-3">
        <div className="grid grid-cols-3 gap-2 w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-10 rounded-xl flex items-center justify-center border ${i === 0 ? 'bg-[#1b84ff]/20 border-[#1b84ff]/50' : 'bg-[#1e3a8a]/20 border-[#1e3a8a]/30'}`}>
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
        <div className="p-3 bg-[#1e3a8a]/20 rounded-xl">
          <div className="w-14 h-1 bg-gray-600 rounded mb-1"></div>
          <div className="text-base font-bold font-mono text-gray-500 tracking-widest">4 8 2 1 9 3</div>
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
            <div key={i} className={`w-7 h-9 rounded-lg border flex items-center justify-center text-sm font-bold ${i < 3 ? 'bg-[#1e3a8a]/40 border-[#1b84ff]/40 text-white' : 'bg-[#1e3a8a]/20 border-[#1e3a8a]/30 text-gray-600'}`}>{n}</div>
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
const LoadingOverlay = ({ label }) => (
  <div className="absolute inset-0 bg-[#0b1829]/70 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#1b84ff]/20 border-t-[#1b84ff] rounded-full animate-spin mb-4"></div>
    <p className="text-[#1b84ff] font-bold text-sm animate-pulse">{label}</p>
  </div>
);

/* Shield SVG icon (Settrade-style red/white shield) */
const ShieldIcon = ({ size = 'md' }) => {
  const s = size === 'lg' ? 56 : size === 'xs' ? 14 : 40;
  return (
    <svg width={s} height={s} viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L4 12V32C4 46.4 14.8 59.6 28 64C41.2 59.6 52 46.4 52 32V12L28 2Z" fill="url(#shieldGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <path d="M28 2L52 12V32C52 46.4 41.2 59.6 28 64V2Z" fill="url(#shieldGradRight)"/>
      <path d="M20 32L26 38L36 26" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="52" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e84142"/>
          <stop offset="1" stopColor="#b91c1c"/>
        </linearGradient>
        <linearGradient id="shieldGradRight" x1="28" y1="2" x2="52" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d1d5db" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#9ca3af" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

/* Phone icon with colorful app grid */
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
      className="bg-[#1a1a2e] rounded-xl border-2 border-gray-700 flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0"
    >
      {/* Notch */}
      <div style={{ width: Math.round(16 * scale), height: Math.round(4 * scale) }} className="absolute top-0 bg-gray-800 rounded-b-lg z-10"></div>
      {/* App grid */}
      <div style={{ paddingTop: Math.round(8 * scale) }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gap: gap,
            padding: padding,
          }}
        >
          {appColors.slice(0, cols * rows).map((color, i) => (
            <div
              key={i}
              style={{ width: cellSize, height: cellSize, backgroundColor: color }}
              className="rounded"
            ></div>
          ))}
        </div>
        {/* Home bar */}
        <div style={{ width: Math.round(20 * scale), height: Math.round(2 * scale) }} className="bg-gray-500 rounded-full mx-auto mt-1"></div>
      </div>
    </div>
  );
};

/* QR Code icon (black/white QR pattern) */
const QrCodeIcon = () => (
  <div className="w-[72px] h-[72px] bg-white dark:bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-transparent shadow-sm">
    <QrCode size={52} className="text-gray-900" strokeWidth={1.5} />
  </div>
);

export default TwoFactorAuth;
