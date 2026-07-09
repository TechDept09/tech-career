import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Upload,
  CheckCircle2,
  Loader2,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  domicile: z.string().min(2, "City / location is required"),
  education: z.string().min(1, "Please select your education level"),
  experience: z.string().min(1, "Please select your work experience"),
  skills: z.string().min(10, "Please describe your skills (min. 10 characters)"),
  salary: z.string().min(1, "Expected salary is required"),
  cv: z
    .instanceof(FileList)
    .refine((files: FileList) => files?.length === 1, "Please upload your CV"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CVForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      domicile: "",
      education: "",
      experience: "",
      skills: "",
      salary: "",
    },
  });

  const formatIDR = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp " + rupiah;
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIDR(e.target.value);
    form.setValue("salary", formatted);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("domicile", values.domicile);
      formData.append("education", values.education);
      formData.append("experience", values.experience);
      formData.append("skills", values.skills);
      formData.append("salary", values.salary);
      if (values.cv && values.cv.length > 0) {
        formData.append("cv", values.cv[0]);
      }

      const response = await fetch(
        "https://n8n.n8nhomelab.uk/webhook/it-tech",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to submit application");

      setIsSuccess(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you! We'll review your application and be in touch soon.",
        className: "bg-emerald-50 border-emerald-200 text-emerald-900",
      });

      form.reset();
      setFileName(null);

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-lg border-none shadow-2xl shadow-blue-900/20 bg-white/90 backdrop-blur-xl">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Application Submitted!
          </h2>
          <p className="text-slate-500 max-w-xs">
            Our HR team will review your application and reach out within 3–5 business days.
          </p>
          <Button
            variant="outline"
            className="mt-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => setIsSuccess(false)}
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  const inputClass =
    "bg-white/60 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 pl-9";

  return (
    <Card className="w-full max-w-lg border-none shadow-2xl shadow-blue-900/20 bg-white/90 backdrop-blur-xl">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-1 w-8 rounded-full bg-blue-600" />
          <div className="h-1 w-3 rounded-full bg-blue-300" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900">
          Apply Now
        </CardTitle>
        <CardDescription className="text-slate-500">
          Fill in your details to apply for the{" "}
          <span className="font-semibold text-blue-700">
            Ai & Automations
          </span>{" "}
          position
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Your full name"
                        {...field}
                        className={inputClass}
                        data-testid="input-name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email & Phone side by side */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="email@example.com"
                          type="email"
                          {...field}
                          className={inputClass}
                          data-testid="input-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">
                      Phone / WhatsApp
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="+62 8xx-xxxx-xxxx"
                          {...field}
                          className={inputClass}
                          data-testid="input-phone"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Domicile */}
            <FormField
              control={form.control}
              name="domicile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">
                    Current City
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="City, Province"
                        {...field}
                        className={inputClass}
                        data-testid="input-domicile"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Education & Experience side by side */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">
                      Education Level
                    </FormLabel>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10 pointer-events-none" />
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="pl-9 bg-white/60 border-slate-200 focus:border-blue-500"
                            data-testid="select-education"
                          >
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Associate (D3)">Associate (D3)</SelectItem>
                          <SelectItem value="Bachelor (S1)">Bachelor (S1)</SelectItem>
                          <SelectItem value="Master (S2)">Master (S2)</SelectItem>
                          <SelectItem value="Doctorate (S3)">Doctorate (S3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">
                      Work Experience
                    </FormLabel>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10 pointer-events-none" />
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="pl-9 bg-white/60 border-slate-200 focus:border-blue-500"
                            data-testid="select-experience"
                          >
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fresh Graduate">Fresh Graduate</SelectItem>
                          <SelectItem value="< 1 Year">&lt; 1 Year</SelectItem>
                          <SelectItem value="1-2 Years">1–2 Years</SelectItem>
                          <SelectItem value="3-5 Years">3–5 Years</SelectItem>
                          <SelectItem value="> 5 Years">&gt; 5 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Skills */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">
                    Skills & Competencies
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Python, machine learning, workflow automation, API integration, process optimization, data analysis, AI implementation, RPA, scripting..."
                      {...field}
                      className="bg-white/60 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 min-h-[80px] resize-none"
                      data-testid="input-skills"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expected Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">
                    Expected Salary (IDR)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Rp 5.000.000"
                        {...field}
                        onChange={(e) => {
                          handleSalaryChange(e);
                          field.onChange(e);
                        }}
                        className={inputClass}
                        data-testid="input-salary"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CV Upload */}
            <FormField
              control={form.control}
              name="cv"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">
                    Upload CV
                  </FormLabel>
                  <FormControl>
                    <label
                      htmlFor="file-upload"
                      className="group relative flex items-center gap-4 rounded-xl border border-dashed border-slate-300 p-4 cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50/50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                        {fileName ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Upload className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">
                          {fileName || "Click to upload your CV"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          PDF, DOC, DOCX — max. 10MB
                        </p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          handleFileChange(e);
                          onChange(e.target.files);
                        }}
                        {...field}
                        data-testid="input-cv"
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold h-12 rounded-xl shadow-lg shadow-blue-700/30 transition-all duration-300 hover:scale-[1.01] mt-2"
              disabled={isSubmitting}
              data-testid="button-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
