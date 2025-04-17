import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, Checkbox as MuiCheckbox, FormControlLabel, FormHelperText, InputAdornment, Chip, InputLabel } from '@mui/material';
import useStyles from './input.styles';
import emailStyles from './email.styles';
import { storeObj } from 'lib/redux';
import { formatCurrency, formatNumber } from 'lib/format';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import Button from 'components/button/button';

function FormInput({
    adornment = '$',
    autoFocus = false,
    error = false,
    iconAdornment = null,
    label = '',
    helperText = '',
    multiline = false,
    onChange = (e) => { },
    placeholder = '',
    rows = 1,
    maxRows = 0,
    minRows = 0,
    style = {},
    type = '',
    value = '',
    onPaste = () => { },
    disabled = false,
    onKeyUp = () => { },
    maxLength = -1,
    InputProps = {},
    fullWidth = false,
    startAdornment = () => {
        return (
            <InputAdornment position="start">
                {adornment}
            </InputAdornment>
        )
    }
}: any) {
    const classes = useStyles({});

    //iconAdornment !== null && (
    startAdornment = () => {
        return (
            <>
                {iconAdornment !== null && (
                    <InputAdornment position="start">
                        <i className={`fas fa-${iconAdornment}`}></i>
                    </InputAdornment>
                )}
            </>
        )
    }
    //)

    return (
        <div className="input-wrapper" style={style}>
            {multiline === true ? (
                <FormControl classes={classes} sx={{ width: '100%' }}>
                    <div>
                        <TextField
                            label={label}
                            autoFocus={autoFocus}
                            onChange={onChange}
                            maxRows={maxRows}
                            minRows={minRows}
                            value={value}
                            sx={{ width: '100%' }}
                            multiline
                            inputProps={{
                                maxLength: maxLength
                            }}
                            variant="standard"
                        />
                        {helperText && (
                            <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>{helperText}</FormHelperText>
                        )}
                    </div>
                </FormControl>
            ) : (
                <TextField
                    fullWidth={fullWidth}
                    autoFocus={autoFocus}
                    classes={classes}
                    error={error}
                    helperText={helperText}
                    label={label}
                    multiline={multiline}
                    onChange={onChange}
                    placeholder={placeholder}
                    inputProps={{ maxLength: maxLength }}
                    InputProps={{ startAdornment: startAdornment(), ...InputProps }}
                    rows={rows}
                    type={type}
                    value={value}
                    sx={{
                        width: '100%',
                        "& .MuiInput-root": {
                            color: "white !important",
                        },
                        "& label.Mui-focused": {
                            color: "darkgray !important"
                        },
                        "& Mui-focused": {
                            color: "darkgray !important"
                        },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                            borderColor: "darkgray !important"
                        },
                        "& .MuiInput-underline:before": {
                            borderColor: "darkgray !important",
                            color: "darkgray !important"
                        },
                        "& .MuiInput-underline:after": {
                            borderColor: "white !important",
                            color: "darkgray !important"
                        },
                        "& .Mui-focused:after": {
                            color: "darkgray !important",
                        },
                        "& .MuiInputAdornment-root": {
                            color: "darkgray !important",
                        }
                    }}
                    disabled={disabled}
                    onPaste={onPaste}
                    onKeyUp={onKeyUp}
                    variant="standard"
                />
            )}
        </div>
    );
}

//WenmoSendMoneyModal

function Currency({
    autoFocus = false,
    onChange,
    style = {},
    value,
    label = null,
    disabled = false,
}: any) {
    return (
        <FormInput
            autoFocus={autoFocus}
            iconAdornment="dollar-sign"
            helperText={formatCurrency(value || 0)}
            label={label ? label : 'Amount'}
            onChange={(e) => onChange(e.target.value, e)}
            style={style}
            value={value}
            disabled={disabled}
        />
    );
}

//FormInput.Currency = Currency;

interface SelectProps {
    label: string;
    value: string | number;
    onChange: any;
    items: any;
}

const Select: React.FC<SelectProps> = (props) => {
    return (
        <>
            <FormControl fullWidth sx={{ width: '100%' }}>
                <TextField id="outlined-select-currency" variant='standard' select label={props.label} value={props.value} onChange={(e) => props.onChange(e.target.value)} sx={{
                    "& .MuiInput-root": {
                        color: "white !important",
                    },
                    "& label.Mui-focused": {
                        color: "darkgray !important"
                    },
                    "& Mui-focused": {
                        color: "darkgray !important"
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderColor: "darkgray !important"
                    },
                    "& .MuiInput-underline:before": {
                        borderColor: "darkgray !important",
                        color: "darkgray !important"
                    },
                    "& .MuiInput-underline:after": {
                        borderColor: "white !important",
                        color: "darkgray !important"
                    },
                    "& .Mui-focused:after": {
                        color: "darkgray !important",
                    },
                    "& .MuiInputAdornment-root": {
                        color: "darkgray !important",
                    }
                }}>
                    {props.items && props.items.length > 0 ? (
                        props.items.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))
                    ) : (
                        <MenuItem value={props.items.id}>{props.items.name}</MenuItem>
                    )}
                </TextField>
            </FormControl>
        </>
    );
}

interface DatePickerProps {
    label: string;
    value: number;
    onChange: any;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateField
                    className="mui-datepicker"
                    variant="standard"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label={props.label}
                    value={new Date(props.value)}
                    onChange={props.onChange}
                />
            </LocalizationProvider>
        </>
    );
}

function Email({
    autoFocus,
    onChange,
    label = "Email",
    readOnly,
    useNormalInput,
    value = '',
}: any) {
    const classes = emailStyles({});

    if (useNormalInput) {
        return (
            <FormInput
                autoFocus={autoFocus}
                iconAdornment="at"
                helperText={value} //need func here for help text
                label="Email"
                onChange={onChange}
                value={value}
            />
        )
    }

    const contacts = storeObj.getState()['phone.apps.lifeinvader'].list;

    return (
        <FormControl classes={classes}>
            <Autocomplete
                freeSolo={true}
                value={value}
                onChange={(e, newValue) => {
                    typeof newValue === 'string' ? onChange(newValue) : newValue && newValue.inputValue ? onChange(newValue.inputValue) : newValue && newValue.email ? onChange(newValue.email) : onChange('')
                }}
                defaultValue={value}
                id={`autocomplete-${Math.random()}`}
                filterOptions={(options) => {
                    return Array.isArray(options) && options.length > 0 && options.filter((option) => {
                        return (
                            !value ||
                            -1 !==
                            ''
                                .concat(option.title)
                                .concat(option.email)
                                .toLowerCase()
                                .indexOf(value.toLowerCase())
                        )
                    });
                }}
                options={Array.isArray(contacts) && contacts.map((contact) => {
                    return {
                        title: contact.name,
                        email: contact.email
                    }
                })}
                getOptionLabel={(option) => {
                    return option.email || option;
                }}
                style={{ width: '100%' }}
                disabled={readOnly}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            autoFocus={autoFocus}
                            label={label}
                            style={{ width: '100%' }}
                            onChange={(e) => {
                                onChange(e.target.value, e)
                            }}
                            variant="standard"
                            sx={{
                                width: '100%',
                                "& .MuiInput-root": {
                                    color: "white !important",
                                },
                                "& label.Mui-focused": {
                                    color: "darkgray !important"
                                },
                                "& Mui-focused": {
                                    color: "darkgray !important"
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderColor: "darkgray !important"
                                },
                                "& .MuiInput-underline:before": {
                                    borderColor: "darkgray !important",
                                    color: "darkgray !important"
                                },
                                "& .MuiInput-underline:after": {
                                    borderColor: "white !important",
                                    color: "darkgray !important"
                                },
                                "& .Mui-focused:after": {
                                    color: "darkgray !important",
                                },
                                "& .MuiInputAdornment-root": {
                                    color: "darkgray !important",
                                }
                            }}
                        />
                    )
                }}
                renderOption={(props, option) => {
                    return (
                        <MenuItem {...props}>
                            {option.title}
                        </MenuItem>
                    )
                }}
            />
        </FormControl>
    );
}

function MultiEmail({
    label = "Emails",
    onChange,
    value = [],
    readOnly,
    useNormalInput,
}: any) {
    const [isEditingCC, setIsEditingCC] = React.useState(false);
    const classes = emailStyles({ isEditingCC: isEditingCC });

    const contacts = storeObj.getState()['phone.apps.lifeinvader'].list ?? [];

    return (
        <FormControl classes={classes}>
            <Autocomplete
                multiple={true}
                id="tags-filled"
                options={Array.isArray(contacts) && contacts?.map((contact) => {
                    return {
                        title: contact?.name,
                        email: contact?.email
                    } ?? [];
                }) || []}
                defaultValue={value}
                value={value}
                freeSolo={true}
                onChange={(e, newValue) => {
                    if (!readOnly) {
                        const emails = newValue?.map((item) => {
                            return typeof item === 'string' ? {
                                title: item,
                                email: item
                            } : item;
                        })?.filter((item, index, self) => {
                            return self?.findIndex((t) => {
                                return t?.email === item?.email;
                            }) === index;
                        });
                        onChange(emails ?? []);
                    }
                }}
                onFocus={() => setIsEditingCC(true)}
                onBlur={() => setIsEditingCC(false)}
                getOptionLabel={(option) => option?.title || option}
                renderTags={(value, getTagProps) => {
                    return value?.map((option, index) => {
                        return (
                            <Chip
                                variant="outlined"
                                label={option?.title}
                                {...getTagProps({ index })}
                            />
                        )
                    });
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label={label}
                            placeholder="Enter address..."
                            variant="standard"
                            sx={{
                                width: '100%',
                                "& .MuiInput-root": {
                                    color: "white !important",
                                },
                                "& label.Mui-focused": {
                                    color: "darkgray !important"
                                },
                                "& Mui-focused": {
                                    color: "darkgray !important"
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderColor: "darkgray !important"
                                },
                                "& .MuiInput-underline:before": {
                                    borderColor: "darkgray !important",
                                    color: "darkgray !important"
                                },
                                "& .MuiInput-underline:after": {
                                    borderColor: "white !important",
                                    color: "darkgray !important"
                                },
                                "& .Mui-focused:after": {
                                    color: "darkgray !important",
                                },
                                "& .MuiInputAdornment-root": {
                                    color: "darkgray !important",
                                }
                            }}
                        />
                    )
                }}
                renderOption={(props, option) => {
                    return (
                        <MenuItem {...props}>
                            {option?.title}
                        </MenuItem>
                    )
                }}
            />
        </FormControl>
    )
}

interface CheckboxProps {
    checked: boolean;
    label: string;
    onChange: (value: boolean, e: any) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <>
            <FormControlLabel
                control={<MuiCheckbox
                    color="warning"
                    checked={props.checked}
                    onChange={(e) => props.onChange(e.target.checked, e)}
                />}
                label={props.label}
                style={{ color: 'white' }}
            />
        </>
    )
}

function Text({
    autoFocus = false,
    icon,
    label,
    onChange,
    placeholder = '',
    value,
    helperText = '',
    onPaste = () => { },
    onKeyUp = () => { },
    maxLength = -1,
    onClick = () => { },
    fullWidth = false,
}: any) {
    return (
        <FormInput
            autoFocus={autoFocus}
            iconAdornment={icon}
            label={label}
            onChange={(e) => onChange(e.target.value, e)}
            placeholder={placeholder}
            value={value}
            helperText={helperText}
            onPaste={onPaste}
            onKeyUp={onKeyUp}
            maxLength={maxLength}
            onClick={onClick}
            fullWidth={fullWidth}
        />
    );
}

function TextArea({
    autoFocus = false,
    icon,
    label,
    helperText = '',
    onChange,
    value,
    maxLength = -1,
}: any) {
    return (
        <FormInput
            autoFocus={autoFocus}
            iconAdornment={icon}
            label={label}
            helperText={helperText}
            onChange={(e) => onChange(e.target.value, e)}
            value={value}
            multiline={true}
            minRows={2}
            maxRows={15}
            maxLength={maxLength}
        />
    );
}

function Phone({
    autoFocus = false,
    onChange,
    useNormalInput = false,
    value = '',
}: any) {
    if (useNormalInput) {
        return (
            <FormInput
                autoFocus={autoFocus}
                iconAdornment='phone'
                helperText={formatNumber(value)} //gotta make the func (b func 1 param string)
                label='Phone Number'
                onChange={(e) => {
                    onChange(e.target.value.replace(/[^0-9]+/g, '').substring(0, 10), e);
                }}
                value={value}
            />
        );
    }

    const contacts = storeObj.getState()['phone.apps.contacts'].list;

    return (
        <Autocomplete
            freeSolo={true}
            value={value}
            onChange={(e, newValue) => {
                typeof newValue === 'string' ? onChange(newValue) : newValue && newValue.inputValue ? onChange(newValue.inputValue) : newValue && newValue.number ? onChange(newValue.number) : onChange('')
            }}
            defaultValue={value}
            id={`autocomplete-${Math.random()}`}
            filterOptions={(options) => {
                return options.filter((option) => {
                    return (
                        !value ||
                        -1 !==
                        ''
                            .concat(option.title)
                            .concat(option.number)
                            .toLowerCase()
                            .indexOf(value.toLowerCase())
                    )
                });
            }}
            options={contacts.map((contact) => {
                return {
                    title: contact.name,
                    number: contact.number
                }
            })}
            getOptionLabel={(option) => {
                return option.number || option;
            }}
            style={{ width: '100%' }}
            renderInput={(params) => {
                return (
                    <div ref={params.InputProps.ref}>
                        <TextField
                            {...params}
                            autoFocus={autoFocus}
                            label='Phone Number'
                            style={{ width: '100%' }}
                            onChange={(e) => {
                                onChange(e.target.value, e)
                            }}
                            variant="standard"
                            sx={{
                                width: '100%',
                                "& .MuiInput-root": {
                                    color: "white !important",
                                },
                                "& label.Mui-focused": {
                                    color: "darkgray !important"
                                },
                                "& Mui-focused": {
                                    color: "darkgray !important"
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderColor: "darkgray !important"
                                },
                                "& .MuiInput-underline:before": {
                                    borderColor: "darkgray !important",
                                    color: "darkgray !important"
                                },
                                "& .MuiInput-underline:after": {
                                    borderColor: "white !important",
                                    color: "darkgray !important"
                                },
                                "& .Mui-focused:after": {
                                    color: "darkgray !important",
                                },
                                "& .MuiInputAdornment-root": {
                                    color: "darkgray !important",
                                }
                            }}
                        />
                    </div>
                )
            }}
            renderOption={(props, option) => {
                return (
                    <MenuItem {...props}>
                        {option.title}
                    </MenuItem>
                )
            }}
        />
    );
}

function Comment({
    autoFocus = false,
    onChange,
    value,
}) {
    return (
        <FormInput
            autoFocus={autoFocus}
            iconAdornment='comment'
            label='Comment'
            onChange={(e) => onChange(e.target.value, e)}
            value={value}
        />
    )
}

interface CityIDProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    value: number;
}

const CityID: React.FC<CityIDProps> = (props) => {
    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="id-card"
                label="State ID"
                onChange={(e) => props.onChange(e.target.value, e)}
                value={props.value}
            />
        </>
    )
}

interface AccountIDProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    label?: string;
    value: number;
}

const AccountID: React.FC<AccountIDProps> = (props) => {
    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="passport"
                label={`Account ${props.label ? props.label : 'ID'}`}
                onChange={(e) => props.onChange(e.target.value, e)}
                value={props.value}
            />
        </>
    )
}

interface BusinessProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    value: string;
}

const Business: React.FC<BusinessProps> = (props) => {
    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="briefcase"
                label="Business Name"
                onChange={(e) => props.onChange(e.target.value, e)}
                value={props.value}
            />
        </>
    )
}

interface NameProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    value: string;
    label?: string;
    disabled?: boolean;
}

const Name: React.FC<NameProps> = (props) => {
    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="user"
                label={props?.label ? props.label : "Name"}
                onChange={(e) => props.onChange(e.target.value, e)}
                value={props.value}
                disabled={props.disabled}
            />
        </>
    )
}

interface PaypalIDProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    value: string;
}

const PaypalID: React.FC<PaypalIDProps> = (props) => {
    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="id-card-alt"
                label="Paypal ID"
                onChange={(e) => props.onChange(e.target.value, e)}
                value={props.value}
            />
        </>
    )
}

interface PasswordProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    value: number;
}

const Password: React.FC<PasswordProps> = (props) => {
    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="user-lock"
                label="Password"
                onChange={(e) => props.onChange(e.target.value, e)}
                type="password"
                value={props.value}
            />
        </>
    )
}

interface SearchProps {
    autoFocus?: boolean;
    onChange: (...args: any) => void;
    value: string;
    style?: any;
}

const Search: React.FC<SearchProps> = (props) => {
    const style = props.style ? props.style : {};

    return (
        <>
            <FormInput
                autoFocus={props.autoFocus}
                iconAdornment="search"
                label="Search"
                onChange={(e: any) => props.onChange(e.target.value)}
                value={props.value}
            />
        </>
    )
}

const ImageList = ({
    autoFocus = false,
    icon,
    label,
    minWidth,
    minHeight,
    onChange,
    placeholder = '',
    value,
    helperText = '',
    onPaste = () => { },
    onKeyUp = () => { },
    maxLength = -1,
    InputProps = {},
}) => {
    const [images, setImages] = React.useState<HTMLImageElement[]>(value ?? []);
    const [currentUrl, setCurrentUrl] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const imageListRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        imageListRef.current?.scroll({ top: imageListRef.current.scrollHeight, behavior: 'smooth' });
    }, [images]);

    const areImagesApproxSameSize = (a: HTMLImageElement, b: HTMLImageElement) => {
        const diffRatioW = Math.abs(a.naturalWidth / b.naturalWidth);
        const diffRatioH = Math.abs(a.naturalHeight / b.naturalHeight);
        return diffRatioW < 1.1 && diffRatioW > 0.9 && diffRatioH < 1.1 && diffRatioH > 0.9;
    }

    const getImage = (url: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = url;
        });
    }

    const addUrl = async () => {
        if (currentUrl.length === 0) return;
        const image = await getImage(currentUrl);
        if (minWidth && image.naturalWidth < minWidth) return setError(`Your pages must be at least ${minWidth}x${minHeight}.`);
        if (minHeight && image.naturalHeight < minHeight) return setError(`Your pages must be at least ${minWidth}x${minHeight}.`);
        if (images.length > 0 && !areImagesApproxSameSize(images[0], image)) return setError('Your pages must all be approximately the same size.');
        setError('');

        const newImages = [...images, image];
        setImages(newImages);
        setCurrentUrl('');
        onChange({
            pagesUrls: newImages.map(x => x.src),
            width: newImages[0]?.naturalWidth ?? 0,
            height: newImages[0]?.naturalHeight ?? 0,
        });
    }

    const removeUrl = async (index: number) => {
        if (images.length === 0) return;
        setError('');
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        onChange({
            pagesUrls: newImages.map(x => x.src),
            width: newImages[0]?.naturalWidth ?? 0,
            height: newImages[0]?.naturalHeight ?? 0,
        });
    }

    const classes = useStyles();

    return (
        <div>
            <InputLabel size="small" shrink style={{ width: '100%' }}>
                {label}
            </InputLabel>
            <div className={classes.imageListContainer} ref={imageListRef}>
                {images.map((image, index) =>
                    <div className={classes.pageImageContainer}>
                        <img src={image.src} className={classes.pageImage}></img>
                        <Button.Primary className={classes.removeButton} onClick={() => removeUrl(index)}>-</Button.Primary>
                    </div>
                )}
            </div>
            <div className={classes.pageUrlInputContainer}>
                <div className={classes.pageUrlInput}>
                    <FormInput
                        autoFocus={autoFocus}
                        iconAdornment={icon}
                        onChange={(e) => setCurrentUrl(e.target.value)}
                        placeholder={placeholder}
                        value={currentUrl}
                        error={error.length > 0}
                        helperText={helperText}
                        onPaste={onPaste}
                        onKeyUp={onKeyUp}
                        maxLength={maxLength}
                        InputProps={InputProps}
                    />
                </div>
                <Button.Primary className={classes.addButton} onClick={() => addUrl()}>+</Button.Primary>
            </div>
        </div>
    )
}

export default { Select, DatePicker, Checkbox, Text, Password, CityID, AccountID, Business, Name, PaypalID, Search, Phone, TextArea, Currency, Comment, Email, MultiEmail, ImageList };